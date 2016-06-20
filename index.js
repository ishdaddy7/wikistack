
var Sequelize = require('sequelize');


var db = new Sequelize('postgres://localhost:5432/wikistack-db'); 

var User = db.define('user', {
	name: Sequelize.STRING, 
	email: Sequelize.STRING
})

var Page = db.define('page', {
	title: Sequelize.STRING, 
	urlTitle: Sequelize.STRING,
	content: Sequelize.STRING,
	date: Sequelize.DATE,
	status: Sequelize.ENUM('open', 'closed') 

})

module.exports = {
  Page: Page,
  User: User
};

