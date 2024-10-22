/// <reference types="cypress" />
const detailsIngredient = 'Детали ингредиента';
const addIngredientText = 'Добавить';

Cypress.Commands.add(
  'addIngredientToConstructor',
  (dataCySelector, itemName) => {
    cy.get(`[data-cy=${dataCySelector}]`)
      .contains(addIngredientText)
      .click({ force: true });
    cy.get('[data-cy=constructor-ingredients]')
      .contains(itemName)
      .should('exist');
  }
);

Cypress.Commands.add('addItemToOrder', (ingredientType) => {
  cy.get(`[data-cy=${ingredientType}-ingredient]`)
    .contains(addIngredientText)
    .click({ force: true });
});

Cypress.Commands.add('placeOrder', () => {
  cy.get('[data-cy=order-button]').click({ force: true });
});

Cypress.Commands.add('checkOrderDetails', (expectedIngredients) => {
  cy.wait('@postOrder').its('request.body').should('deep.equal', {
    ingredients: expectedIngredients
  });

  cy.get('[data-cy=order-number]').contains('98989').should('exist');
});

Cypress.Commands.add('closeOrderModal', () => {
  cy.get('[data-cy=close-modal]').click();
  cy.get('[data-cy=order-number]').should('not.exist');
});

Cypress.Commands.add(
  'checkIngredientsNotExist',
  (burgerConstructor, ingredients) => {
    ingredients.forEach((ingredient) => {
      cy.get(burgerConstructor).contains(ingredient).should('not.exist');
    });
  }
);

Cypress.Commands.add('openIngredientModal', (ingredientName) => {
  cy.contains(ingredientName).click({ force: true });
  cy.contains(detailsIngredient).should('exist');
  cy.get('[data-cy=modal]').contains(ingredientName).should('exist');
});

Cypress.Commands.add('closeModalWithButton', () => {
  cy.get('[data-cy=close-modal]').should('exist').click();
  cy.contains(detailsIngredient).should('not.exist');
});

Cypress.Commands.add('closeModalWithOverlay', () => {
  cy.get('[data-cy=overlay]').click('right', { force: true });
  cy.contains(detailsIngredient).should('not.exist');
});
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
