import { defineConfig } from 'cypress';
import { configurePlugin } from './dist';

export default defineConfig({
  video: false,
  allowCypressEnv: false,
  e2e: {
    env: {
      mongodb: {
        collection: 'cypress_collection',
        database: 'cypress_database',
      },
    },
    specPattern: 'cypress/e2e/config.uri.cy.ts',
    setupNodeEvents(on, config) {
      configurePlugin(on);
      return config;
    },
  },
});
