import * as mongo from 'cypress-mongodb';

export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  mongo.configurePlugin(on);
};
