import { configurePlugin } from '../../dist';

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on: Cypress.PluginEvents) => {
  configurePlugin(on);
};
