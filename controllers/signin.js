const pool = require("../sql/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(user, "tacos");
};

const signin = (req, res) => {
  const { name, password, email } = req.body;

  pool.query(
    `SELECT * FROM users WHERE email = '${email}'`,
    async (err, results, fields) => {
      if (err) {
        console.log(err);
      }

      console.log(results);

      const match = await bcrypt.compare(password, results[0].password);

      if (match) {
        const token = generateToken(results[0]);
        res.json({
          token,
          user: req.user,
        });
      } else {
        res.sendStatus(403);
      }
    }
  );
};

module.exports = {
  signin,
};
