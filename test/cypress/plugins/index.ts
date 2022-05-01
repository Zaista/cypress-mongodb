const mongo = require('cypress-mongodb');

module.exports = (on, config) => {
  mongo.configurePlugin(on);
}