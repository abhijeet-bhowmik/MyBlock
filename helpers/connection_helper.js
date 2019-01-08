let Sequelize = require("sequelize");
const getConnection = function() {
	const sequelize = new Sequelize('MyBlock', 'root', 'root', {
            dialect: "mysql",
            host: '0.0.0.0'
        });
	return new Promise(function(resolve, reject){
		sequelize.authenticate().then(function(){
			return resolve(sequelize);
		})
		.catch(function(err){
			return reject(err);
			
		})
	})
};

module.exports = getConnection();
