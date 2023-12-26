const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const db = require("../Connect/db");

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log("Email:", email);

  try {
    const checkUserQuery = "SELECT * FROM signup WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error checking user:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Email found!");
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = results[0];

      const passwordMatch = await bcrypt.compare(password, user["Password"]);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, "your_secret_key", {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
