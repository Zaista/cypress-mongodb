import { defineConfig } from 'cypress'
import { configurePlugin } from './dist';

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on) {
      configurePlugin(on);
    },
  },
})
