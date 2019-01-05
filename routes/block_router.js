let router = require("express").Router();
let blockController = require("../controllers/block_controller.js");



router.get("/:blockHash", blockController.getSpecificBlock);




module.exports = router;