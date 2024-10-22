declare namespace Cypress {
  interface Chainable {
    addIngredientToConstructor(
      dataCySelector: string,
      itemName: string
    ): Chainable<void>;
    checkIngredientsNotExist(
      burgerConstructor: string,
      ingredients: string[]
    ): Chainable<void>;
    addItemToOrder(ingredientType: string): Chainable<void>;
    checkOrderDetails(expectedIngredients: string[]): Chainable<void>;
    placeOrder(): Chainable<void>;
    closeOrderModal(): Chainable<void>;
    openIngredientModal(ingredientName: string): Chainable<void>;
    closeModalWithButton(): Chainable<void>;
    closeModalWithOverlay(): Chainable<void>;
  }
}
