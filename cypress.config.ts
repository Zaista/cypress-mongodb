import { defineConfig } from 'cypress'
import { configurePlugin } from './dist';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      return configurePlugin(on);
    },
  },
})
