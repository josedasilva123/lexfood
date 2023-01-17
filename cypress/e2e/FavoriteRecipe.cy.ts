
beforeEach(() => {
  cy.autologin();
  cy.recipes();
  cy.categories();
})

describe("template spec", () => {
   it("should be able to add recipe to the favorite list", () => { 
      cy.visit("http://localhost:3000");

      cy.intercept('favorite', {
        statusCode: 200,
        body: {}
      })

      cy.contains("Favoritar").click();
   });

   it("should throw error when try to add a recipe twice", () => {
    cy.visit("http://localhost:3000");

      cy.intercept('favorite', {
        statusCode: 200,
        body: {}
      })

      cy.contains("Favoritar").click();
      cy.contains("Favoritar").click();
   })
});
