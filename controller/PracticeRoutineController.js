//const bcrypt = require("bcrypt");
//const { validationResult } = require("express-validator");
const mysql = require("mysql");
const db = require("../Connect/db");

exports.addRoutine = async (req, res) => {
  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  console.log(req.body);
  const { name, aim, DateStarted } = req.body;

  try {
    //const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery =
      "INSERT INTO practiceroutines (RoutineName, aim, DateStarted) VALUES (?, ?, ?)";
    db.query(insertQuery, [name, aim, DateStarted], (err, result) => {
      if (err) {
        console.error("Error inserting user into the database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      console.log("Routine Addded successfully");
      res.status(200).json({ message: "Routine adding successful" });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
