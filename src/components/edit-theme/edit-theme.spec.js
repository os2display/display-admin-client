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
      .should("match", /^Rediger følgende tema: system-worthy/);
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
    cy.get("#themeName").type("x");
    cy.get("#save_theme").click();
    cy.get("#save_theme").should("not.exist");
  });

  it("Colors load", () => {
    cy.visit("/theme/32");
    cy.get(".color-preview").should("have.length", 4);
    cy.get(".color-preview")
      .eq(0)
      .should("have.css", "background-color", "rgb(33, 16, 251)");
    cy.get(".color-preview")
      .eq(1)
      .should("have.css", "background-color", "rgb(155, 205, 155)");
    cy.get(".color-preview")
      .eq(2)
      .should("have.css", "background-color", "rgb(199, 255, 0)");
    cy.get(".color-preview")
      .eq(3)
      .should("have.css", "background-color", "rgb(0, 0, 0)");
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
