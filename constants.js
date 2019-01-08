const fs = require("fs");

module.exports = {
  "HTTP_PROVIDER" : "https://ropsten.infura.io/v3/",
  "API_KEY" : "4158e87756e143f685463f8d663eb83f",
  "PRIVATE_KEY" : fs.readFileSync("./key/private_key.key").toString('hex'),
  "WALLET_ADDRESS" : "0xd94dc1CC42816c14Cf6Cf73750107075cB90c570"
}