describe('Создание заказа', () => {
  const burgerConstructorSelector = '[data-cy=burger-constructor]';
  const bunId = '643d69a5c3f7b9001cfa093c';
  const mainIngredientId = '643d69a5c3f7b9001cfa0941';
  const sauceId = '643d69a5c3f7b9001cfa0945';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post-order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('Создание заказа', () => {
    cy.addItemToOrder('bun');
    cy.addItemToOrder('main');
    cy.addItemToOrder('sauce');

    cy.placeOrder();

    cy.checkOrderDetails([bunId, mainIngredientId, sauceId, bunId]);

    cy.closeOrderModal();

    cy.checkIngredientsNotExist(burgerConstructorSelector, [
      bunId,
      mainIngredientId,
      sauceId,
      bunId
    ]);
  });
});
