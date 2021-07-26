describe("Edit tag page loads", () => {
  it("It loads", () => {
    cy.visit("/tag/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret nyt tag/);
    cy.visit("/tag/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger følgende tag: matrices/);
  });
});
