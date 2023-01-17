describe('autologin', () => {
  it('shoud be able to autologin user', () => {
    cy.autologin();
    cy.recipes();
    cy.visit('http://localhost:3000');
  })
})