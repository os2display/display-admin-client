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
  it("It goes back", () => {
    cy.visit("/slides");
    cy.visit("/slide/new");
    cy.get(".container")
      .find("button")
      .eq(0)
      .invoke("text")
      .should("match", /^Annuller/);
    cy.get("input").type("Hello, World");
    cy.get("#save_slide").click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Konsolider/);
  });
});
