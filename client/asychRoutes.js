import asyncComponent from './utils/asyncComponent';

if (typeof System === 'undefined') {
  var System = {
    import: function(path) {
      return Promise.resolve(require(path));
    }
  };
}

export const Signin = asyncComponent(() => {
  return System.import('./pages/SigninPage')
    .then(module => module.default);
});

export const Signup = asyncComponent(() => {
  return System.import('./pages/SignupPage')
    .then(module => module.default);
});

export const Signout = asyncComponent(() => {
  return System.import('./pages/SignoutPage')
    .then(module => module.default);
});

export const User = asyncComponent(() => {
  return System.import('./pages/UserPage')
    .then(module => module.default);
});

export const Error = asyncComponent(() => {
  return System.import('./pages/ErrorPage')
    .then(module => module.default);
});

export const Secret = asyncComponent(() => {
  return System.import('./pages/SecretPage')
    .then(module => module.default);
});