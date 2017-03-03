import User from '../models/user';

export const getProfile = (req, res, next) => {
  const id = req.signedCookies.user_id;
  User.findOne({ '_id': id}, (err, existingUser) => {
    if (err) { return next(err) }
    if (!existingUser) {
      return res.status(422).send({ error: 'User not found !' });
    }
    const profile = existingUser.profile;
    const user = {
      name: profile.name,
      email: existingUser.email,
      picture: profile.picture,
      age: profile.age,
      gender: profile.gender
    };

    return res.status(200).send({ user });
  });
}

export const updateProfile = (req, res, next) => {
  const { email, gender, name, age } = req.body;
  const id = req.signedCookies.user_id;

  User.findOne({ '_id': id }, (err, user) => {
    if (err) { return next(err); };
    if (!user) {
      return res.status(422).send({ error: 'User not found !' });
    }
    res.cookie('user_name', name);
    user.email = email;
    user.profile.age = age;
    user.profile.name = name;
    user.profile.gender = gender;
    user.save(err => {
      if (err) { return next(err); }
      return res.send('succesfully saved');
    });
  });

}

export const getAccount = (req, res, next) => {
  const id = req.signedCookies.user_id;
  User.findOne({ '_id': id}, (err, existingUser) => {
    if (err) { return next(err) }
    if (!existingUser) {
      return res.status(422).send({ error: 'User not found !' });
    }
    const containPassword = typeof existingUser.password !== 'undefined'
    const user = {
      containPassword
    };

    return res.status(200).send({ user });
  });
}

export const updateAccount = (req, res, next) => {
  const { password, newPassword } = req.body;
  const id = req.signedCookies.user_id;
  User.findOne({ '_id': id }, (err, user) => {
    if (err) { return next(err); };
    if (!user) {
      return res.status(422).send({ error: 'User not found !' });
    }
    if (typeof user.password === 'undefined') {
      user.password = newPassword;
      user.save(err => {
        if (err) { return next(err); }
        return res.send({ success: 'Succesfully saved !'});
      });
    } else {
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return next(err); }
        if (!isMatch) { return done(null, false); }
        user.password = newPassword;
        user.save(err => {
          if (err) { return next(err); }
          return res.send({ success: 'Succesfully saved !'});
        });
      });
    }
  });
}

export const getPhoto = (req, res, next) => {
  const id = req.signedCookies.user_id;
  User.findOne({ '_id': id}, (err, existingUser) => {
    if (err) { return next(err) }
    if (!existingUser) {
      return res.status(422).send({ error: 'User not found !' });
    }
    const image = existingUser.profile.picture;
    return res.status(200).send({image});
  });
}

export const uploadPhoto = (req, res, next) => {
  const id = req.signedCookies.user_id;
  const imageName = req.file.filename;

  User.findOne({ '_id': id }, (err, user) => {
    if (err) { return next(err); };
    if (!user) {
      return res.status(422).send({ error: 'User not found !' });
    }
    res.cookie('user_photo', imageName);
    user.profile.picture = imageName;
    user.save(err => {
      if (err) { return next(err); }
      return res.send({
        userPhoto: imageName,
        message: 'Succesfully saved !'
      });
    });
  });
}

