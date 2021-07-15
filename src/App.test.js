describe("Simple app loads", () => {
  it("Loads and simple test", () => {
    cy.visit("localhost:3000/");
    cy.get(".App").should("not.be.empty");
  });
});
