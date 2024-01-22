const db = require("../db/db");

const CheckUser = async (user) => {
  const { my_key, secret, sign } = user;
  const hasSign = sign === "a04dfc0a2cad6d0665aedc00dcd29698";
  const hasUser = await db.query(
    `SELECT id FROM users WHERE secret='${secret}' AND my_key='${my_key}'`
  );
  return hasUser.length > 0 && hasSign;
};

module.exports = CheckUser;
