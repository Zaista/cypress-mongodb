import { defineConfig } from 'cypress'
import { configurePlugin } from './src';

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on) {
      configurePlugin(on);
    },
  },
})
