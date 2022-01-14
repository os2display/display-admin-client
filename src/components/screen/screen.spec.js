describe("Screen pages work", () => {
  it("It loads create screen page", () => {
    cy.visit("/screen/create");
    cy.get("#save_screen").should("exist");
  });

  it("It picks layout and redirects on save", () => {
    cy.visit("/screen/create");
    cy.get("#layout-section").find(".dropdown-container").type("{enter}");
    cy.get("#layout-section").find('[type="checkbox"]').eq(0).check();
    cy.get("#layout-section").find(".grid-item").should("have.length", 1);
    cy.get("#layout-section").find(".nav-item").should("have.length", 1);
    cy.get("#layout-section")
      .find(".dropdown-heading-value")
      .contains("Odio rem voluptatum");
    cy.get("#layout-section").find(".dropdown-container").type("{esc}");
    cy.get("#save_screen").click();
    cy.url().should("include", "screen/edit/");
  });

  it("It cancels create screen", () => {
    cy.visit("/screen/create");
    cy.get("#cancel_screen").should("exist");
    cy.get("#cancel_screen").click();
    cy.get("#cancel_screen").should("not.exist");
  });
});
