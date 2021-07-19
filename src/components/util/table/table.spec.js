describe("Table loads", () => {
  it("It loads", () => {
    cy.visit("/");
    cy.get("table").should("not.be.empty");
  });
});
