const express = require("express");
const app = express();
const pool = require("./sql/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/users");
const todosRoutes = require("./routes/todos");
const signupRoutes = require("./routes/signup");
const signinRoutes = require("./routes/signin");

const PORT = process.env.PORT || 5000;

function authenticateToken(req, res, next) {
  // Get meta information for request
  const authHeader = req.headers.authorization;
  console.log({ auth: req.headers.authorization });

  // Store the token in variable
  const token = authHeader && authHeader.split(" ")[1];
  console.log({ token });

  // What if no token
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "tacos", (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    console.log(req.user);
    next();
  });
}

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Origin", "http://localhost:3000");

  // Request methods we wish to allow
  res.setHeader("Access-Control-Allow-Methods", "POST");

  // REquest headers we wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include
  // cookies in the requests set to the API.
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
app.use("/signup", signupRoutes);
app.use("/signin", signinRoutes);
app.use("/users", authenticateToken, userRoutes);
// app.use("/todos", authenticateToken, todosRoutes);
app.use("/todos", todosRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our server!",
  });
});

app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));
