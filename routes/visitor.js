var express = require("express");
var router = express.Router();
const visitorController = require("../controllers/visitorController");
const path = require("path");
let multer = require("multer"); //the library
let storage = multer.diskStorage({
  destination: "./public/uploaded_images/",
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
}); //Configure the place you will upload your file

let upload = multer({ storage: storage }); //instanciation of multer

/* GET home page. */
router.get("/", visitorController.home);
router.get("/sign_up", visitorController.sign_up);
router.post("/sign_up", upload.single("photo"), visitorController.sign_up_post);
router.get("/sign_in", visitorController.sign_in);
router.post("/sign_in", visitorController.sign_in_post);
router.get("/sign_out", visitorController.sign_out);
router.get("/one", visitorController.one_post);

module.exports = router;
