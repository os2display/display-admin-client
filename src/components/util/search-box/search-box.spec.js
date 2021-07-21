describe("Search box loads", () => {
  it("It loads", () => {
    cy.visit("/tags");
    cy.get("#search-field").should('exist');
    cy.get("#search-field").should("be.empty");
  });

  it("It searches", () => {
    cy.visit("/tags");
    cy.get("#search-field").invoke("val").should("be.empty");
    cy.get("tbody").find("tr").should("have.length", 10);
    cy.visit("/tags?search=test");
    cy.get("#search-field").invoke("val").should("match", /^test/);
    cy.get("tbody").find("tr").should("have.length", 1);
  });
});
