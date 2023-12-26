const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const mysql = require("mysql");
const db = require("../Connect/db");

exports.addUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  const { name, email, dob, password, phone, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery =
      "INSERT INTO signup (name, email, dob, password, phone, address) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      insertQuery,
      [name, email, dob, hashedPassword, phone, address],
      (err, result) => {
        if (err) {
          console.error("Error inserting user into the database:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        console.log("User signed up successfully");
        res.status(200).json({ message: "Signup successful" });
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
