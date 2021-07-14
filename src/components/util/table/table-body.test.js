describe("Table header loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find('tr td').should('have.length', 60)
  });

});
