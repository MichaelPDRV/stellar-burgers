describe('Добавление ингредиентов в конструктор', () => {
  const bun = 'Краторная булка N-200i';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Добавление булки в конструктор', () => {
    cy.addItemToOrder('bun');
    cy.get('[data-cy=bun-top]').contains(bun).should('exist');
    cy.get('[data-cy=bun-bottom]').contains(bun).should('exist');
  });

  it('Добавление начинки в конструктор', () => {
    cy.addIngredientToConstructor(
      'main-ingredient',
      'Биокотлета из марсианской Магнолии'
    );
    cy.addIngredientToConstructor(
      'sauce-ingredient',
      'Соус с шипами Антарианского плоскоходца'
    );
  });
});
