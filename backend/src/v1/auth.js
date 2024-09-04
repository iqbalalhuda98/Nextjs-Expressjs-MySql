const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const { findAdminByEmail } = require("./admin/admin.repository");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).send({
        message: "Email and password are required.",
      });
    }

    const dataAdmin = await findAdminByEmail(email);
    if (!dataAdmin) {
      res.status(401).send({
        message: "Email does not exist.",
      });
    }

    const isValid = await bcrypt.compare(password, dataAdmin.password);
    if (!isValid) {
      res.status(401).send({
        message: "Invalid password.",
      });
    }

    const token = jwt.sign({
      id: dataAdmin.id,
      name: dataAdmin.first_name + " " + dataAdmin?.last_name,
      email: dataAdmin.email,
    }, process.env.API_KEY, { expiresIn: "1h" });

    res.status(200).send({
      id: dataAdmin.id,
      name: dataAdmin.first_name + " " + dataAdmin?.last_name,
      email: dataAdmin.email,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;