const UserLoginProvider = require("./UserLoginProvider");
const { authManager, AuthProviderTypes } = require("@teselagen/tgauth");
const UserCreator = require("./UserCreator");

function initAuthManager(express) {
  const localAuthProvider = {
    type: AuthProviderTypes.LOCAL
  };

  const azureAuthProvider = {
    type: AuthProviderTypes.AD,
    customProviderLogoutRedirectUrl: "http://localhost:3000/login"
  };

  const authProviders = [localAuthProvider, azureAuthProvider];
  const userProvider = new UserLoginProvider(express);

  authManager.initialize(userProvider, authProviders);

  authManager.addAuthToExpressApp(express);

  const userCreator = new UserCreator(express.get("db"));
  authManager.addUserSignupToExpressApp(express, userCreator);

  return authManager;
}

module.exports = initAuthManager;
