describe("Edit theme page tests", () => {
  it("It loads edit new theme", () => {
    cy.visit("/theme/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret nyt tema/);
    cy.visit("/theme/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger følgende tema: matrices/);
  });

  it("It validates new theme", () => {
    cy.visit("/theme/new");
    cy.get("#save_theme")
      .invoke("text")
      .should("match", /^Gem tema/);
    cy.get("#save_theme").click();
    cy.get("#save_theme")
      .invoke("text")
      .should("match", /^Gem tema/);
    cy.get("input").type("x");
    cy.get("#save_theme").click();
    cy.get("#save_theme").should("not.exist");
  });

  it("It validates already existing theme", () => {
    cy.visit("/theme/32");
    cy.get("#themeName").clear();
    cy.get("#save_theme")
      .invoke("text")
      .should("match", /^Gem tema/);
    cy.get("#save_theme").click();
    cy.get("#save_theme")
      .invoke("text")
      .should("match", /^Gem tema/);
    cy.get("#themeName").type("x");
    cy.get("#save_theme").click();
    cy.get("#save_theme").should("not.exist");
  });
});
