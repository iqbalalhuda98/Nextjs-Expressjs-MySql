const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = !!authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.API_KEY, (err, admin) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.id = admin.id;
    req.name = admin.name;
    req.email = admin.email;
    next();
  });
};

module.exports = auth;