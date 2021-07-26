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
    cy.get("#slide_template").select("Text-and-image");
    cy.get("#title").type("Hello, World");
    cy.get("#box-align").select("Toppen");
    cy.get("#duration").type(123);
    cy.get("#save_slide").click();
    cy.get("#save_slide").should("not.exist");
  });
});
