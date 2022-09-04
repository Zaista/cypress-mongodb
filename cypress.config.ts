import { defineConfig } from 'cypress'
import { configurePlugin } from './src';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      configurePlugin(on);
    },
  },
})
