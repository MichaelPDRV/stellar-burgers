describe('Открытие и закрытие модального окна с описанием ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Открытие модального окна с отображением элемента по которому кликнули', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click({ force: true });

    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal').contains('Краторная булка N-200i').should('exist');
  });

  it('Закрытие модального окна по клику на крестик', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-modal]').should('exist');
    cy.get('[data-cy=close-modal]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=overlay]').click('right', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});
