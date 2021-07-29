describe("Edit tag page tests", () => {
  it("It loads edit new tag", () => {
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

  it("It validates new tag", () => {
    cy.visit("/tag/new");
    cy.get("#save_tag")
      .invoke("text")
      .should("match", /^Gem tag/);
    cy.get("#save_tag").click();
    cy.get("#save_tag")
      .invoke("text")
      .should("match", /^Gem tag/);
    cy.get("input").type("x");
    cy.get("#save_tag").click();
    cy.get("#save_tag").should("not.exist");
  });

  it("It validates already existing tag", () => {
    cy.visit("/tag/32");
    cy.get("#tagName").clear();
    cy.get("#save_tag")
      .invoke("text")
      .should("match", /^Gem tag/);
    cy.get("#save_tag").click();
    cy.get("#save_tag")
      .invoke("text")
      .should("match", /^Gem tag/);
    cy.get("#tagName").type("x");
    cy.get("#save_tag").click();
    cy.get("#save_tag").should("not.exist");
  });
});
