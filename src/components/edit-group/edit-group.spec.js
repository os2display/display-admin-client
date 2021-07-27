describe("Edit group page loads", () => {
  it("It loads", () => {
    cy.visit("/group/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny gruppe/);
    cy.visit("/group/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger følgende gruppe: Infoskærme/);
  });
});
