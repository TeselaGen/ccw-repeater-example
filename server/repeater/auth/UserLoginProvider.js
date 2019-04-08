const findUserLoginByLoginName = require("./userlogin");

class UserProvider {
  constructor(express) {
    this.express = express;
  }

  async getUserLogin(loginName) {
    const accountFound = await findUserLoginByLoginName(
      this.express,
      loginName
    );

    if (accountFound) {
      return accountFound;
    } else {
      return undefined;
    }
  }
}

module.exports = UserProvider;
