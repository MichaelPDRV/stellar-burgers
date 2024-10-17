describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Добавление булки в конструктор', () => {
    cy.get('[data-cy=bun-ingredient]')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=bun-top]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=bun-bottom]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('Добавление начинки в конструктор', () => {
    cy.get('[data-cy=main-ingredient]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredient]')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус с шипами Антарианского плоскоходца')
      .should('exist');
  });
});
