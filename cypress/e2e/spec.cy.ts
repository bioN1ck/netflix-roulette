describe('Counter', () => {
  it('should increase when click', () => {
    cy.visit('http://localhost:3000/');
    cy.getEl('counter').should('have.text', 0);

    cy.getEl('increment-btn').click();
    cy.getEl('counter').should('have.text', 1);

    cy.getEl('increment-btn').click();
    cy.getEl('increment-btn').click();
    cy.getEl('increment-btn').click();
    cy.getEl('counter').should('have.text', 4);

    cy.getEl('decrement-btn').click();
    cy.getEl('counter').should('have.text', 3);
  })
})
