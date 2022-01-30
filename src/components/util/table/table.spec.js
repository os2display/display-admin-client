describe("Table loads", () => {
  it("It loads", () => {
    cy.visit("/slide/list");
    cy.get("tbody").should("not.be.empty");
  });
});
