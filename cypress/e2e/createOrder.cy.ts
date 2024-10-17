describe('Создание заказа', () => {
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
    cy.get('[data-cy=bun-ingredient]')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=main-ingredient')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=sauce-ingredient')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=order-button').click({ force: true });

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093c'
        ]
      });

    cy.get('[data-cy=order-number]').contains('98989').should('exist');
    cy.get('[data-cy=close-modal]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=burger-constructor]')
      .contains('643d69a5c3f7b9001cfa093c')
      .should('not.exist');

    cy.get('[data-cy=burger-constructor]')
      .contains('643d69a5c3f7b9001cfa0941')
      .should('not.exist');

    cy.get('[data-cy=burger-constructor]')
      .contains('643d69a5c3f7b9001cfa0945')
      .should('not.exist');
    cy.get('[data-cy=burger-constructor]')
      .contains('643d69a5c3f7b9001cfa093c')
      .should('not.exist');
  });
});
