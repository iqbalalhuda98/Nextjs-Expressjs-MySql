const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../images/"));
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    cb(null, Date.now() + fileExt);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;