describe("Topbar loads", () => {
  it("It loads", () => {
    cy.visit("/slides");
    cy.get("#topbar").should("exist");
  });

  it("It navigates", () => {
    cy.visit("/slides");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
    cy.get("#topbar_add").click();
    cy.get("#nav-items_add_screen").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Skærme/);

    cy.get("#nav-items_add_playlist").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Spillelister/);

    cy.get("#nav-items_add_slide").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
    // @TODO: Add a textcase for Faq
    // @TODO: Add a textcase for Signout
  });
});
