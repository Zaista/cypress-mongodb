import * as mongo from 'cypress-mongodb';

module.exports = (on) => {
  mongo.configurePlugin(on);
};
