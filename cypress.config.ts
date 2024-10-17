import { defineConfig } from "cypress";

export default defineConfig({
	
  e2e: {
  experimentalWebKitSupport: true,
  baseUrl: 'http://localhost:4000', 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
