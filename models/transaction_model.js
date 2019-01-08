let conn = require("../helpers/connection_helper");
let Sequelize = require("sequelize");



module.exports = function(){
    return new Promise(function(resolve, reject) {
      conn.then((dbObject) => {
        let transactionModel = dbObject.define("Transaction", {
          "TransactionID": {
            "type": Sequelize.INTEGER,
            "allowNull": false,
            "primaryKey": true,
            "autoIncrement": true
          },
          "TransactionHash": {
            "type": Sequelize.STRING,
            "allowNull": false
          },
          "ReceipentAddress": {
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

