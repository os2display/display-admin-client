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
  it("It goes back", () => {
    cy.visit("/groups");
    cy.visit("/group/new");
    cy.get(".container")
      .find("button")
      .eq(0)
      .invoke("text")
      .should("match", /^Annuller/);
    cy.get("input").type("Hello, World");
    cy.get("#save_group").click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Konsolider/);
  });
});
