import { defineConfig } from 'cypress';
import { configurePlugin } from './src/index.ts';

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
      return config;
    },
  },
});
