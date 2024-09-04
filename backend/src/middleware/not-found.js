const notFound = (req, res) =>
  res.status(404).send({ message: "API not found." });

module.exports = notFound;