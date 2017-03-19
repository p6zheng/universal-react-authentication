import User from '../models/user';

export const getProfile = (req, res, next) => {
  const id = req.signedCookies.user_id;
  User.findOne({ '_id': id})
    .then((existingUser) => {
      if (!existingUser) return res.status(422).send({ error: 'User not found !' });
      const profile = existingUser.profile;
      const user = {
        name: profile.name,
        email: existingUser.email,
        picture: profile.picture,
        age: profile.age,
        gender: profile.gender
      };
      return res.status(200).send({ user });
    })
    .catch((err) => next(err));
};

export const updateProfile = (req, res, next) => {
  const { email, gender, name, age } = req.body;
  const id = req.signedCookies.user_id;

  User.findOne({ '_id': id })
    .then((existingUser) => {
      if (!existingUser) return res.status(422).send({ error: 'User not found !' });
      res.cookie('user_name', name, { signed: true });
      existingUser.email = email;
      existingUser.profile.age = age;
      existingUser.profile.name = name;
      existingUser.profile.gender = gender;
      return existingUser.save();
    })
    .then(() => res.send({ message: 'Successfully updated !'}))
    .catch((err) => next(err));
};

export const getAccount = (req, res, next) => {
  const id = req.signedCookies.user_id;

  User.findOne({ '_id': id})
    .then((existingUser) => {
      if (!existingUser) return res.status(422).send({ error: 'User not found !' });
      const containPassword = typeof existingUser.password !== 'undefined';
      const user = {
        containPassword
      };
      return res.status(200).send({ user });
    })
    .catch((err) => next(err));
};

export const updateAccount = (req, res, next) => {
  const { password, newPassword } = req.body;
  const id = req.signedCookies.user_id;

  User.findOne({ '_id': id })
    .then((existingUser) => {
      if (!existingUser) return res.status(422).send({ error: 'User not found !' });
      if (typeof existingUser.password === 'undefined') {
        existingUser.password = newPassword;
        return existingUser.save();
      } else {
        existingUser.comparePassword(password, (err, isMatch) => {
          if (err) { return next(err); }
          if (!isMatch) { return res.status(422).send({ error: 'Incorrect password. Please try again !'}); }
          existingUser.password = newPassword;
          return existingUser.save();
        });
      }
    })
    .then(() => res.send({ message: 'Successfully updated !' }))
    .catch((err) => next(err));
};

export const getPhoto = (req, res, next) => {
  const id = req.signedCookies.user_id;

  User.findOne({ '_id': id })
    .then((existingUser) => {
      if (!existingUser) return res.status(422).send({ error: 'User not found !' });
      const image = existingUser.profile.picture;
      return res.status(200).send({image});
    })
    .catch((err) => next(err));
};

export const uploadPhoto = (req, res, next) => {
  const id = req.signedCookies.user_id;
  const imageName = req.file.filename;

  User.findOne({ '_id': id})
    .then((existingUser) => {
      if (!existingUser) return res.status(422).send({ error: 'User not found !'});
      existingUser.profile.picture = imageName;
      return existingUser.save();
    })
    .then(() => {
      res.cookie('user_photo', imageName, { signed: true });
      return res.send({
        userPhoto: imageName,
        message: 'Successfully uploaded !'
      });
    })
    .catch((err) => next(err));
};

