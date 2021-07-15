describe("Search box loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/");
    cy.get("#search-field").should("not.be.empty");
  });

  it("It searches", () => {
    cy.visit("localhost:3000/");
    cy.get("#search-field").invoke("val").should("be.empty");
    cy.get("tbody").find("tr").should("have.length", 10);
    cy.visit("localhost:3000/tags?search=test");
    cy.get("#search-field").invoke("val").should("match", /^test/);
    cy.get("tbody").find("tr").should("have.length", 1);
  });
});
