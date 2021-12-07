describe("Theme pages work", () => {
  it("It loads create theme page", () => {
    cy.visit("/themes/create");
    cy.get("#save_theme").should("exist");
  });

  it("It loads create theme page", () => {
    cy.visit("/themes/edit/01FN64HM5FZ31XY7BSRPR62GHG");
    cy.get("#save_theme").should("exist");
  });

  it("It redirects on save", () => {
    cy.visit("/themes/create");
    cy.get("#save_theme").click();
    cy.url().should("include", "themes/edit/");
  });

  it("It cancels create theme", () => {
    cy.visit("/themes/create");
    cy.get("#cancel_theme").should("exist");
    cy.get("#cancel_theme").click();
    cy.get("#cancel_theme").should("not.exist");
  });
});
