describe("Edit slide page loads", () => {
  it("It loads", () => {
    cy.visit("/slide/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret nyt slide/);
    cy.visit("/slide/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger følgende slide: Roderigo/);
  });
});
