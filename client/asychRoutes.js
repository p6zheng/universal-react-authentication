import asyncComponent from './utils/asyncComponent';

export const Signin = asyncComponent(() => {
  return import('./pages/SigninPage')
    .then(module => module.default);
});

export const Signup = asyncComponent(() => {
  return import('./pages/SignupPage')
    .then(module => module.default);
});

export const Signout = asyncComponent(() => {
  return import('./pages/SignoutPage')
    .then(module => module.default);
});

export const User = asyncComponent(() => {
  return import('./pages/UserPage')
    .then(module => module.default);
});

export const Error = asyncComponent(() => {
  return import('./pages/ErrorPage')
    .then(module => module.default);
});

export const Secret = asyncComponent(() => {
  return import('./pages/SecretPage')
    .then(module => module.default);
});