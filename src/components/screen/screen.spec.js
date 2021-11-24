describe("Screen pages work", () => {
  it("It loads create screen page", () => {
    cy.visit("/screen/create");
    cy.get("#save_screen").should("exist");
  });

  it("It loads create screen page", () => {
    cy.visit("/screen/edit/00D4JHAPQV09JG1MG714YE19V5");
    cy.get("#save_screen").should("exist");
  });

  it("It picks screen layout", () => {
    cy.visit("/screen/create");
    cy.get("#layout-section").find(".dropdown-container").type("{enter}");
    cy.get("#layout-section").find('[type="checkbox"]').eq(2).check();
    cy.get("#layout-section").find(".grid-item").should("have.length", 4);
    cy.get("#layout-section").find(".nav-item").should("have.length", 4);
    cy.get("#layout-section").find(".dropdown-heading-value").contains(
      "Consequuntur cum eum modi."
    );
  });

  it("It redirects on save", () => {
    cy.visit("/screen/create");
    cy.get("#layout-section").find(".dropdown-container").type("{enter}");
    cy.get("#layout-section").find('[type="checkbox"]').eq(1).check();
    cy.get("#layout-section").find(".dropdown-heading-value").contains(
      "Consequuntur cum eum modi."
    );
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
