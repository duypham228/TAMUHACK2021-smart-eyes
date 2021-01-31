const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { v4 } = require("uuid");
const storage = multer.diskStorage({
  destination: "./known/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + v4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: 1000000 },
}).single("myImage");
router.route("/").post((req, res) => {
  upload(req, res, (err) => {
    if (!err) return res.sendStatus(200);
    else return res.sendStatus(500);
  });
});
module.exports = router;
