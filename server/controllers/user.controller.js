import User from '../models/user';
import cookie from 'react-cookie';

export const getProfile = (req, res, next) => {
  const id = cookie.load('user_id');
  User.findOne({ '_id': id}, (err, existingUser) => {
    if (err) { return next(err) }
    if (!existingUser) {
      return res.status(422).send({ error: 'User not found !' });
    }
    const profile = existingUser.profile;
    const user = {
      name: profile.name,
      email: profile.email,
      pitcture: profile.picture,
      age: profile.age,
      gender: profile.gender
    };

    return res.status(200).send({ user });
  });
}

export const updateProfile = (req, res, next) => {
  const { email, location, name } = req.body;
  const id = cookie.load('user_id');
  const user ={
    local: {
      email
    },
    profile: {
      email,
      location,
      name
    }
  };

  User.findOneAndUpdate({ '_id': id}, user, {upsert: true}, (err, existingUser) => {
    if (err) { return next(err) }
    if (!existingUser) {
      return res.status(422).send({ error: 'User not found !' });
    }
    res.cookie('user_name', name);
    return res.send('succesfully saved');
  });
}
