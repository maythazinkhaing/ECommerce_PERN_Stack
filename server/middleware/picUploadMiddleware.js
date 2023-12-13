const multer = require("multer");
const fs = require("fs");
const path = require("path");

//Image Upload MULTER
const DIR = "public/assets";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

const picUploadMiddleware = (req, res, next) => {
  // Use multer upload instance
  upload.single("picture")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Retrieve uploaded files
    const file = req.file;
    const errors = [];
    // console.log("File FROM MIDDLEWARE :: " + req.file);
    // Validate file types and sizes
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      errors.push("No file uploaded");
    } else {
      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    }

    // Handle validation errors
    // if (errors.length > 0) {
    //   // Remove uploaded file
    //   fs.unlinkSync(file.path);

    //   return res.status(400).json({ errors });
    // }

    // Attach files to the request object
    req.file = file;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = picUploadMiddleware;
