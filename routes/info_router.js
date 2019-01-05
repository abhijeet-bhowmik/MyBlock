let router = require("express").Router();
let infoController = require("../controllers/info_controller.js");


router.get("/balance/:walletID", infoController.getWalletBalance);
router.get("/test", infoController.test);



module.exports = router;