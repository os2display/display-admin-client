describe("Table loads", () => {
  it("It loads", () => {
    cy.visit("/tags");
    cy.get("table").should("not.be.empty");
  });
});
