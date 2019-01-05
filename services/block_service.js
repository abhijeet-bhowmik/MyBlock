let constants = require("../constants");
const Web3 = require("web3");
const Tx = require('ethereumjs-tx');



if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
 } else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(constants.HTTP_PROVIDER + constants.API_KEY));
 }




module.exports = {
  
  
  "getSpecificBlock" : function(blockHash) {
    
    return new Promise(function(resolve, reject) {
      try {
        let latestBlock = web3.eth.getBlock(blockHash, true, function(err,response) {
          if (err) {
            throw (err);
          }
          else {
            return resolve(response);
          }
        });
      } catch(error) {
        let errResponse = {
          "err" : error.message || "Something went wrong."
        }
        return reject(errResponse);
      }
      
    });
  }
};