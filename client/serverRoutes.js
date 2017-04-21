import asyncComponent from './utils/asyncComponent';

export const Signin = asyncComponent(() => {
  return Promise.resolve(require('./pages/SigninPage'))
    .then(module => module.default);
});

export const Signup = asyncComponent(() => {
  return Promise.resolve(require('./pages/SignupPage'))
    .then(module => module.default);
});

export const Signout = asyncComponent(() => {
  return Promise.resolve(require('./pages/SignoutPage'))
    .then(module => module.default);
});

export const User = asyncComponent(() => {
  return Promise.resolve(require('./pages/UserPage'))
    .then(module => module.default);
});

export const Error = asyncComponent(() => {
  return Promise.resolve(require('./pages/ErrorPage'))
    .then(module => module.default);
});

export const Secret = asyncComponent(() => {
  return Promise.resolve(require('./pages/SecretPage'))
    .then(module => module.default);
});