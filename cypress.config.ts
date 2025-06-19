// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        console.log('Launching browser:', browser.name);
        return launchOptions;
      });
    },
  },
});
