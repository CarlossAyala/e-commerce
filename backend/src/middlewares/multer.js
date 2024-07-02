const crypto = require("node:crypto");
const path = require("node:path");
const fs = require("node:fs");
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
	destination: (_req, _file, cb) => {
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
	filename: (_req, file, cb) => {
		const uuid = crypto.randomUUID();
		const extension = path.extname(file.originalname);
		const fileName = uuid + extension;
		cb(null, fileName);
	},
});

const upload = multer({
	storage,
	limits: { fileSize: 2000000 },
	fileFilter: (_req, file, cb) => {
		if (IMAGE_TYPES.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	},
});

module.exports = upload;
