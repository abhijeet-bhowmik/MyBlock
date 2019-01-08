let router = require("express").Router();
let transactionController = require("../controllers/transaction_controller.js");



router.post("/", transactionController.sendTransaction);
router.get("/:txHash", transactionController.getTransactionInfo);




module.exports = router;