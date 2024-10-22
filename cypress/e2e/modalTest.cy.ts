describe('Открытие и закрытие модального окна с описанием ингредиента', () => {
  const bun = 'Краторная булка N-200i';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Открытие модального окна с отображением элемента по которому кликнули', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.openIngredientModal(bun);
  });

  it('Закрытие модального окна по клику на крестик', () => {
    cy.openIngredientModal(bun);
    cy.closeModalWithButton();
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.openIngredientModal(bun);
    cy.closeModalWithOverlay();
  });
});
