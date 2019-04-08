async function findUserLoginByLoginName(express, loginName) {
  const db = express.get("db");
  console.log("Getting user", loginName);

  const userLogin = await db("userLogin")
    .where({
      loginName: loginName
    })
    .first();

  return userLogin;
}

module.exports = findUserLoginByLoginName;
