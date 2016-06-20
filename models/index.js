
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
      return '/wiki/' + route;
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

},
{hooks: {
  beforeValidate: function(page){
  if (page.title){
    page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
  else {
    page.urlTitle = Math.random().toString(36).substring(2,7);
  }
  }
}}
)

console.log(Page);

module.exports = {
  Page: Page,
  User: User
};

