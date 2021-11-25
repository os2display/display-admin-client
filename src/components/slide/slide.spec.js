describe("Slide pages work", () => {
  it("It loads create slide page", () => {
    cy.visit("/slide/create");
    cy.get("#save_slide").should("exist");
  });

  it("It loads create slide page", () => {
    cy.visit("/slide/edit/01FNB8JX2XPG0BA49XQMYETKZV");
    cy.get("#save_slide").should("exist");
  });

  it("It picks template", () => {
    cy.visit("/slide/create");
    cy.get(".dropdown-container").eq(0).type("{enter}");
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get(".dropdown-container").eq(0).click();
    cy.get(".dropdown-heading-value").contains(
      "Perferendis dolores nemo nesciunt"
    );
  });

  it("It redirects on save", () => {
    cy.visit("/slide/create");
    cy.get(".dropdown-container").eq(0).type("{enter}");
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get(".dropdown-container").eq(0).click();
    cy.get("#save_slide").click();
    cy.url().should("include", "slide/edit/");
  });

  it("It cancels create slide", () => {
    cy.visit("/slide/create");
    cy.get("#cancel_slide").should("exist");
    cy.get("#cancel_slide").click();
    cy.get("#cancel_slide").should("not.exist");
  });
});
