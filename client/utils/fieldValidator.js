import * as regex from '../constants/regex';

export const validateEmail = (email) => {
  let message;
  if (!email) {
    message = 'Please enter an email';
  } else if (!regex.email.test(email)) {
    message = 'Please enter a valid email';
  }
  return message;
};

export const validatePassword = (password) => {
  let message;
  if (!password) {
    message = 'Please enter a password';
  } else if (password.length < 4) {
    message = 'Password must be at least 4 characters long';
  } else if (password.length > 8) {
    message = 'Password must be at most 8 characters long';
  } else if (!regex.hasCapital.test(password)) {
    message = 'Password must contain at least a capital letter';
  } else if (!regex.hasLower.test(password)) {
    message = 'Password must contain at least a lower case letter';
  } else if (!regex.hasNum.test(password)) {
    message = 'Password must contain at least a number';
  } else if (!regex.password.test(password)) {
    message = 'Password must be at least 4 characters, ' +
      'no more than 8 characters, and must include at least one upper case letter, ' +
      'one lower case letter, and one numeric digit.';
  }
  return message;
};


export const validateUserName = (username) => {
  let message;
  if (!username) {
    message = 'Please enter a username';
  } else if (username.length < 4) {
    message = 'User name must be at least 4 characters long';
  } else if (username.length > 8) {
    message = 'User name must be at most 8 characters long';
  } else if (!regex.noSpecialChar.test(username)) {
    message = 'User name cannot contain any special characters';
  }
  return message;
};

export const validateName = (name) => {
  let message;
  if (!name) {
    message = 'Please enter a username';
  } else if (name.length < 4) {
    message = 'Name must be at least 4 characters long';
  } else if (name.length > 8) {
    message = 'Name must be at most 8 characters long';
  } else if (!regex.noSpecialChar.test(name)) {
    message = 'Name cannot contain any special characters';
  }
  return message;
};

export const validatePasswordConfirm = (password, passwordConfirm) => {
  let message;
  if (!passwordConfirm) {
    message = 'Please enter a password confirmation';
  } else if (password !== passwordConfirm) {
    message = 'Passwords does not match';
  }
  return message;
};

export const validateAge = (age) => {
  let message;
  if (parseInt(age) < 0 || parseInt(age) > 150 || !regex.isNum.test(age)) {
    message = 'Please enter an valid age';
  }
  return message;
};