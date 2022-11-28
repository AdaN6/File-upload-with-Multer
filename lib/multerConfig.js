const multer = require("multer");
const path = require("path");

// you need to add an extension * remember to import path, otherwise wont work!
const storage = multer.diskStorage({
  desitnation: "./uploads",
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image"))
      return cb(new Error("Invalid file type. Please upload an image!!!!"));
    cb(null, true);
}

const upload = multer({ storage, fileFilter});

module.exports = { upload };
