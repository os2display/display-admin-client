describe("Topbar loads", () => {
  it("It loads", () => {
    cy.visit("/");
    cy.get("#topbar").should("exist");
  });

  it("It navigates", () => {
    cy.visit("/");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
    cy.get("#topbar_add").click();
    cy.get("#nav-items_add_screen").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny skærm/);

    cy.get("#nav-items_add_playlist").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny spilleliste/);

    cy.get("#nav-items_add_slide").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret nyt slide/);
    // @TODO: Add a textcase for Faq
    // @TODO: Add a textcase for Signout
  });
});
