
var Sequelize = require('sequelize');


var db = new Sequelize('postgres://localhost:5432/wikistack-db',{logging: false});

var User = db.define('user', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
  }
})

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    isUrl: true,
    get: function(){
      var route = this.getDataValue('urlTitle');
      return this.getDataValue('/wiki/') +' (' + route + ')';
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'closed'
  }

})

module.exports = {
  Page: Page,
  User: User
};

