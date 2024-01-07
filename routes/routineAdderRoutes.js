const express = require("express");
const routes = express.Router();
const RoutineAdder = require("../controller/PracticeRoutineController");
const ValidateUser = require("../middleware/ValidateSignup");

routes.post("/addRoutine", RoutineAdder.addRoutine);

module.exports = routes;
