let transactionService = require("../services/transaction_service.js");




module.exports = {

  "sendTransaction" : function(req, res) {
    console.log("SendTransaction controller")
    transactionService.sendTransaction(req.body)
      .then(function(txHash) {
        let response = {
          "txCreation" : "success",
          "txHash" : txHash
        };
        res.status(200).send(response);
      })
      .catch(function(errResponse) {
        let response = {
          "txCreation" : "failed",
          "err" : errResponse
        }
        res.status(400).send(response);
      })
  },
  "getTransactionInfo" : function(req, res) {
    transactionService.getTransactionInfo(req.params.txHash)
      .then(function(txInfo) {
        let response = {
          "txFetched" : true,
          "txInfo" : txInfo
        };
        res.status(200).send(response);
      })
      .catch(function(errResponse) {
        let response = {
          "txFetched" : false,
          "err" : errResponse
        }
        res.status(400).send(response);
      })
  }
}