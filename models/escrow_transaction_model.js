let conn = require("../helpers/connection_helper");
let Sequelize = require("sequelize");



let getETransactionModel = function(){
    return new Promise(function(resolve, reject) {
      conn.then((dbObject) => {
        let transactionModel = dbObject.define("EscrowedTransaction", {
          "ETransactionID": {
            "type": Sequelize.INTEGER,
            "allowNull": false,
            "primaryKey": true,
            "autoIncrement": true
          },
          "ETransactionHash": {
            "type": Sequelize.STRING,
            "allowNull": false
          },
          "ReceipentAddress": {
            "type": Sequelize.STRING,
            "allowNull": false,
          },
          "SenderAddress": {
            "type": Sequelize.STRING,
            "allowNull": false,
          },
          "EscrowAddress": {
            "type": Sequelize.STRING,
            "allowNull": false,
          },
          "State": {
            "type" : Sequelize.STRING,
            "allowNull" : false,
            "default" : "SUBMITTED"
          },
          "TimeOfCreation": {
            "type" : Sequelize.TIME,
            "allowNull" : true
          }
        },
        {"freezeTableName" : true,
          "timestamps" : false});
        return resolve(transactionModel);
      }).catch((err) => {
        return reject(err);
      })
    })
  }

module.exports = getETransactionModel;