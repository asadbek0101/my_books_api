const db = require("../db/db");
const helper = require("../helpers/helper");

class AuthRepository {
  async register(query) {
    const { email, password } = query;
    const rows = await db.query(`SELECT * FROM users WHERE email='${email}'`);
    const data = helper.emptyOrRows(rows);

    if (data.length > 0) {
      return "This User Already Signed";
    } else {
      const created = await db.query(`
        INSERT INTO users(email, password, secret, my_key)
        VALUES ("${email}", "${password}", "${email + "Secret"}", "${
        email + "Key"
      }")
      `);
      if (created.affectedRows) {
        return "User Created";
      } else {
        return "Something went wrong";
      }
    }
  }

  async login(query) {
    const { email, password } = query;
    const rows = await db.query(`SELECT * FROM users WHERE email='${email}'`);
    const data = helper.emptyOrRows(rows);

    if (data.length > 0) {
      if (data[0].password == password) {
        return {
          my_key: data[0].my_key,
          secret: data[0].secret,
          sign: "a04dfc0a2cad6d0665aedc00dcd29698",
        };
      } else {
        return "Password is invalid!";
      }
    } else {
      return "User not found!";
    }
  }
}

module.exports = AuthRepository;
