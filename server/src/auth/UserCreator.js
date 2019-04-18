class UserCreator {
  constructor(db) {
    this.db = db;
  }

  async createNewUser(user) {
    console.log("Creating user", user);

    let userRecord = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    };

    let userLoginRecord = {
      loginName: user.userLogins.loginName,
      loginPassword: user.userLogins.loginPassword
    };
    console.log("User Record:", userRecord);

    let newId = await this.db("user")
      .insert(userRecord)
      .returning("id")
      .then(id => {
        userLoginRecord["userId"] = id[0];
        return this.db("userLogin")
          .insert(userLoginRecord)
          .then(() => {
            return Promise.resolve(id);
          });
      })
      .catch(error => {
        console.log("Err", error);
      });
  }
}

module.exports = UserCreator;
