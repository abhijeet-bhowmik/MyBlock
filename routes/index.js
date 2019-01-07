let express = require('express');
let router = express.Router();
let infoRoute = require("./info_router.js");
let blockRoute = require("./block_router.js");

router.use("/wallet", infoRoute);
router.use("/block", blockRoute);

module.exports = router;
