const pool = require("../sql/connection");

const list = (req, res) => {
  pool.query("SELECT * FROM todos", (err, rows, fields) => {
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM todos WHERE id = ${id}`, (err, rows, fields) => {
    res.json(rows);
  });
};

const create = (req, res) => {
  const { todo, user_id } = req.body;
  // Abstract the variables values
  pool.query(
    `INSERT INTO todos (id, todo, user_id) VALUES (?, ?, ?)`,
    // Dependency array
    [null, todo, user_id],
    (err, results, fields) => {
      res.json(results);
    }
  );
};

const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    `UPDATE todos SET ? WHERE id = ?`,
    [req.body, id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

const remove = (req, res) => {
  const { id } = req.params;
  pool.query(`DELETE FROM todos WHERE id = ?`, [id], (err, row, fields) => {
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
