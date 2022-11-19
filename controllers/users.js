const pool = require("../sql/connection");

const list = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows, fields) => {
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM users WHERE id = ${id}`, (err, rows, fields) => {
    res.json(rows);
  });
};

const create = (req, res) => {
  const { name, email, password } = req.body;
  // Abstract the variables values
  pool.query(
    `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
    // Dependency array
    [null, name, email, password],
    (err, results, fields) => {
      res.json(results);
    }
  );
};

const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    `UPDATE users SET ? WHERE id = ?`,
    [req.body, id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

const remove = (req, res) => {
  const { id } = req.params;
  pool.query(`DELETE FROM users WHERE id = ?`, [id], (err, row, fields) => {
    res.json(row);
  });
};

module.exports = {
  list,
  show,
  create,
  update,
  remove,
};
