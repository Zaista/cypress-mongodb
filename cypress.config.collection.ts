import { defineConfig } from 'cypress';
import { configurePlugin } from './dist';

export default defineConfig({
  video: false,
  allowCypressEnv: false,
  e2e: {
    env: {
      mongodb: {
        uri: 'mongodb://localhost:27017',
        database: 'cypress_database',
      },
    },
    specPattern: 'cypress/e2e/config.collection.cy.ts',
    setupNodeEvents(on, config) {
      configurePlugin(on);
      return config;
    },
  },
});
