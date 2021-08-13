describe("Simple app loads", () => {
  it("Loads and simple test", () => {
    cy.visit("/slides");
    cy.get("#root").should("not.be.empty");
  });
});
