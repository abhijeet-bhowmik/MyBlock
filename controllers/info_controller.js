let infoService = require("../services/info_service.js");




module.exports = {
  "getWalletBalance" : function(req, res) {
    infoService.getWalletBalance(req.params["walletID"])
      .then(function(response) {
        res.status(200).send(response);
      })
      .catch(function(errResponse) {
        
        res.status(400).send(errResponse);
      })
  },
  "test" : function(req, res) {
    infoService.test()
      .then(function(response) {
        res.status(200).send(response);
      })
      .catch(function(errResponse) {
        
        res.status(400).send(errResponse);
      })
  }
}