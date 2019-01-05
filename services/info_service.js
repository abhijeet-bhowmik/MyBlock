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
  "getWalletBalance" : function(walletAddress) {
    
    return new Promise(function(resolve, reject) {
      try {
        getBalance = web3.eth.getBalance(walletAddress);
        getBalance.then(function(result) {
        
          let response = {
            "walletBalance" : result
          }
          return resolve(response);
        }).catch(function(err) {
    
          let errResponse = {
            "status" : "",
            "err" : err || "Wallet address invalid."
          }
          return reject(errResponse);
        });
      } catch(error) {
        let errResponse = {
          "err" : error.message || "Wallet address invalid."
        }
        return reject(errResponse);
      }
      
    });
  },
  "test" : function() {
    
    return new Promise(function(resolve, reject) {
      try {
        let latestBlock = web3.eth.getBlock("latest", true, function(err,response) {
          if (err) {
            console.log(err);
          }
          else {
            console.log(response);
          }
        });
      } catch(error) {
        let errResponse = {
          "err" : error.message || "Something went wrong."
        }
        return reject(errResponse);
      }
      
    });
  },
  "getLatestBlock" : function() {
    
    return new Promise(function(resolve, reject) {
      try {
        let latestBlock = web3.eth.getBlock("latest", true, function(err,response) {
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