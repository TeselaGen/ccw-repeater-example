const UserLoginProvider = require("./UserLoginProvider");
const { authManager, AuthProviderTypes } = require("@teselagen/tgauth");

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

  return authManager;
}

module.exports = initAuthManager;
