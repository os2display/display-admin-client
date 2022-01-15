describe("Slide pages work", () => {
  it("It loads create slide page", () => {
    cy.visit("/slide/create");
    cy.get("#save_slide").should("exist");
  });

  it("It picks template and redirects on save", () => {
    cy.visit("/slide/create");
    cy.get("#template-section")
      .find(".dropdown-container")
      .eq(0)
      .type("{enter}");
    cy.get("#template-section").find('[type="checkbox"]').eq(1).check();
    cy.get("#template-section").find(".dropdown-container").eq(0).click();
    cy.get("#template-section")
      .find(".dropdown-heading-value")
      .contains("Perferendis dolores nemo nesciunt");
    cy.get("#save_slide").click();
    cy.wait(1000)
    cy.url().should("include", "slide/edit/");
  });

  it("It cancels create slide", () => {
    cy.visit("/slide/create");
    cy.get("#cancel_slide").should("exist");
    cy.get("#cancel_slide").click();
    cy.get("#cancel_slide").should("not.exist");
  });
});
