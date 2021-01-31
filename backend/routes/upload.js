const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { v4 } = require("uuid");
const { spawn } = require("child_process");
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
}).single("myImage");
router.route("/").post((req, res) => {
  upload(req, res, (err) => {
    let dataToSend = null;
    const pyScript = spawn('python', ['app.py']);
    pyScript.stdout.on('data', (data) => {
      console.log("pip data from python script...");
      dataToSend = data.toString();
    })
    pyScript.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      
    })
    if (!err) return res.send(dataToSend);
    else return res.sendStatus(500);

  });
});
module.exports = router;
