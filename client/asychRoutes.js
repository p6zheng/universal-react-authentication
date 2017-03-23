import asyncComponent from './utils/asyncComponent';

if (typeof System === "undefined") {
  var System = {
    import: function(path) {
      return Promise.resolve(require(path));
    }
  };
}

export const Signin = asyncComponent(() => {
  return System.import('./containers/SigninPage')
    .then(module => module.default);
});

export const Signup = asyncComponent(() => {
  return System.import('./containers/SignupPage')
    .then(module => module.default);
});

export const Signout = asyncComponent(() => {
  return System.import('./containers/SignoutPage')
    .then(module => module.default);
});

export const User = asyncComponent(() => {
  return System.import('./containers/UserPage')
    .then(module => module.default)
});

export const Error = asyncComponent(() => {
  return System.import('./containers/ErrorPage')
    .then(module => module.default);
});

export const Secret = asyncComponent(() => {
  return System.import('./containers/SecretPage')
    .then(module => module.default);
});