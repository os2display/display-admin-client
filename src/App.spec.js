describe("Simple app loads", () => {
  it("Loads and simple test", () => {
    cy.visit("/");
    cy.get(".App").should("not.be.empty");
  });
});
