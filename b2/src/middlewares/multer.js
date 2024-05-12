const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const IMAGE_TYPES = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const publicDir = path.join(__dirname, "../../public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    const imagesDir = path.join(publicDir, "images");
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    const uuid = crypto.randomUUID();
    const extension = path.extname(file.originalname);
    const fileName = uuid + extension;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    if (IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = upload;
