const UserLoginProvider = require("./UserLoginProvider");
const { AuthManager, AuthProviderTypes } = require("@teselagen/tgauth");

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

  const authManager = new AuthManager(userProvider, authProviders);

  authManager.addAuthToExpressApp(express);
}

module.exports = initAuthManager;
