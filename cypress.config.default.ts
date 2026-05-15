import { defineConfig } from 'cypress';
import { configurePlugin } from './dist';

export default defineConfig({
  video: false,
  allowCypressEnv: false,
  e2e: {
    env: {
      mongodb: {
        uri: 'mongodb://localhost:27017',
        collection: 'cypress_collection',
        database: 'cypress_database',
      },
    },
    excludeSpecPattern: ['**/config.*.cy.ts'],
    setupNodeEvents(on, config) {
      configurePlugin(on);
      return config;
    },
  },
});
