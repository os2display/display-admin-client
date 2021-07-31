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

  it("It validates new group", () => {
    cy.visit("/group/new");
    cy.get("#save_group")
      .invoke("text")
      .should("match", /^Gem gruppen/);
    cy.get("#save_group").click();
    cy.get("#save_group")
      .invoke("text")
      .should("match", /^Gem gruppen/);
    cy.get("input").type("x");
    cy.get("#save_group").click();
    cy.get("#save_group").should("not.exist");
  });

  it("It validates already existing group", () => {
    cy.visit("/group/32");
    cy.get("#groupName").clear();
    cy.get("#save_group")
      .invoke("text")
      .should("match", /^Gem gruppen/);
    cy.get("#save_group").click();
    cy.get("#save_group")
      .invoke("text")
      .should("match", /^Gem gruppen/);
    cy.get("#groupName").type("x");
    cy.get("#save_group").click();
    cy.get("#save_group").should("not.exist");
  });
});
