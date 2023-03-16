var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

let multer = require("multer"); //the library
let storage_1 = multer.diskStorage({
  destination: "./public/post_images/",
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});
let upload_1 = multer({ storage: storage_1 }); //instanciation of multer

let storage_2 = multer.diskStorage({
  destination: "./public/uploaded_images/",
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
}); //Configure the place you will upload your file

let upload_2 = multer({ storage: storage_2 }); //instanciation of multer
/* GET users listing. */
router.get("/post", userController.posts);
router.post("/post", upload_1.single("photo"), userController.add_post);

router.get("/setting", userController.setting);
router.post("/setting", upload_2.single("photo"), userController.setting_post);
router.post("/setting2", userController.setting_post_2);
module.exports = router;
