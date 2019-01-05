let blockService = require("../services/block_service.js");




module.exports = {

  "getSpecificBlock" : function(req, res) {
    blockService.getSpecificBlock(req.params.blockHash)
      .then(function(response) {
        res.status(200).send(response);
      })
      .catch(function(errResponse) {
        
        res.status(400).send(errResponse);
      })
  }
}