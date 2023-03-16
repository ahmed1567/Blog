var express = require("express");
var router = express.Router();
const operController = require("../controllers/operController");
/* GET users listing. */
router.get("/", operController.subscribe);
router.get("/buy", operController.buy);
router.get("/search", operController.search);
router.get("/status", operController.status);
router.get("/remove", operController.remove);
router.get("/all", operController.all);
router.get("/delete", operController.deletes);

module.exports = router;
