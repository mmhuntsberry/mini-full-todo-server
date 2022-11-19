const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todos");

router.get("/", todoControllers.list);

router.get("/:id", todoControllers.show);

router.post("/", todoControllers.create);

router.put("/:id", todoControllers.update);

router.delete("/:id", todoControllers.remove);

module.exports = router;
