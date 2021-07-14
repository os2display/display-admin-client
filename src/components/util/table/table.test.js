describe("Table loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/");
    cy.get("table").should("not.be.empty");
  });
});
