describe("Group pages work", () => {
  it("It loads create group page", () => {
    cy.visit("/group/create");
    cy.get("#save_group").should("exist");
  });

  it("It loads edit group page", () => {
    cy.visit(
      "http://display-admin-client.local.itkdev.dk/group/edit/002PXW3YA40CVQ06BF098P03R1"
    );
    cy.get("#save_group").should("exist");
  });

  it("It redirects on save", () => {
    cy.visit("/group/create");
    cy.get("#save_group").click();
    cy.url().should("include", "group/edit/");
  });

  it("It cancels create group", () => {
    cy.visit("/group/create");
    cy.get("#cancel_group").should("exist");
    cy.get("#cancel_group").click();
    cy.get("#cancel_group").should("not.exist");
  });
});
