// cypress/support/index.d.ts
declare namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      loginAs(username: string): Chainable<void>;
    }
  }