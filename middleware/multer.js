const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExts = [".jpg", ".jpeg", ".png", ".mov", ".mp4"];

    if (!allowedExts.includes(ext)) {
      cb(new Error("File type is not supported"), false);
      return;
    }

    cb(null, true);
  },
});