const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const db = require("./Connect/db");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const UserSignup = require("./routes/signuproutes");
const UserLogin = require("./routes/loginroutes");
const RoutineAdder = require("./routes/routineAdderRoutes");

app.use(UserSignup);
app.use(UserLogin);
app.use(RoutineAdder);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
