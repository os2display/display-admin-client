describe("Simple app loads", () => {
  it("localhost and simple text", () => {
    cy.visit("localhost:3000/");
    cy.get(".App").should("not.be.empty");
  });
});
