/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
  cy.session('seeduser', () => {
    // ✅ 로그인 API만 처리 (API가 실제 로그인 성공 시 세션/쿠키 생성)
    cy.visit('/auth/signin');

    // cy.get('input#email').type('seeduser@example.com');
    // cy.get('input#password').type('secure123');
    cy.get('button[type="submit"]').contains(/^로그인$/).click();

    // ❌ 이 url 체크는 밖에서 해야 반영됨!
    cy.url().should('include', '/dashboard');
  });

  // ✅ session 외부에서 redirect 확인
  cy.visit('/dashboard');
  cy.url().should('include', '/dashboard');
});