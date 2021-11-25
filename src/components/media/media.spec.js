describe("Media upload works", () => {
  it("It loads upload media page", () => {
    cy.visit("/media/create");
    cy.get("#media_cancel").should("exist");
    cy.get("#save_media").should("exist");
    cy.get("#back_to_list").should("exist");
  });

  it("It goes back to list (cancel)", () => {
    cy.visit("/media/create");
    cy.get("#media_cancel").click();
    cy.get("#media-list-title").should("exist");
  });

  it("It goes back to list (back)", () => {
    cy.visit("/media/create");
    cy.get("#back_to_list").click();
    cy.get("#media-list-title").should("exist");
  });
});
