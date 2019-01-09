const Web3 = require("web3");
const Tx = require('ethereumjs-tx');
const constants = require("../constants");
const txModel = require("../models/transaction_model");
const eTxModel = require("../models/escrow_transaction_model");


if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  let web3 = new Web3(new Web3.providers.HttpProvider(constants.HTTP_PROVIDER + constants.API_KEY));
}

function decimalToHex(d) {
  if (Number(d) < 0)
  {
    let hex = 0xFFFFFFFF + Number(d) + 1;
    return hex;
  }
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
  if (hex.length % 2) {
    hex = '0' + hex;
  }
  return hex;
}

console.log("To-Be-Determined".toString('hex').length);
function prepTx(txObject) {
  console.log(txObject);
  let unsignedTx = {
    "to" : txObject.to,
    "value" : decimalToHex(txObject.value),
    "gas" : (txObject.gas && txObject.gas) >= 4712388 ? txObject.gas : 4712388,
    "gasPrice" : decimalToHex(txObject.gasPrice),
    "data" : txObject.data ? txObject.data : '',
    "nonce" : "0x15"
  }
  console.log(unsignedTx);
  let tx = new Tx(unsignedTx);
  tx.sign(constants.PRIVATE_KEY);
  return tx.serialize();

}


let upsertTransaction = function(txObject) {
  let data = {
    "TransactionHash" : txObject.hash,
    "ReceipentAddress" : txObject.to,
    "State" : txObject.state || "SUBMITTED"
  }
  txModel().then(function(transModel) {
    transModel.upsert(data).then(function(result) {
      console.log(result);
    })
  }).catch(function(err) {
    console.log(err);
  })
}

let upsertEscrowedTransaction = function(txObject) {
  let data = {
    "ETransactionHash" : txObject.hash,
    "ReceipentAddress" : txObject.to,
    "SenderAddress" : txObject.from,
    "EscrowAddress" : constants.WALLET_ADDRESS,
    "State" : txObject.state || "SUBMITTED"
  }
  eTxModel().then(function(eTransModel) {
    eTransModel.upsert(data).then(function(result) {
      console.log(result);
    })
  }).catch(function(err) {
    console.log(err);
  })
}



module.exports = {
  "sendTransaction" : function(txObject) {
    return new Promise(function(resolve, reject) {
      try{
        const signedTx = prepTx(txObject);
        web3.eth.sendSignedTransaction('0x' + signedTx.toString('hex'), function(err, hash) {
          if (err) {
            return reject(err.message);
          }
          else {
            // perform some upation operation on your end to note down the transaction.
            txObject.hash = txInfo;
            upsertTransaction(txObject);
            console.log(hash);
            return resolve(hash);
          }
        });
      } catch(exception) {
        console.log("####### Exception #########")
        console.log(exception);
        return reject(exception.message);
      }
    })
    
  },
  "getTransactionInfo" : function(txHash) {
    console.log(txHash);
    return new Promise(function(resolve, reject) {
      try {
        web3.eth.getTransaction(txHash)
          .then(function(txInfo) {
            return resolve(txInfo);
          })
          .catch(function(err) {
            return reject(err);
          })
      } catch(exception) {
        return reject(exception);
      }
    })
  },
  
}

  





