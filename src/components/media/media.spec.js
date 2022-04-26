describe("Media upload works", () => {
  beforeEach(() => {
    cy.visit("/admin/media/list");
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.visit("/admin/media/create");
    cy.get("#login").click();
    cy.wait(["@token"]);
  });

  it("It loads upload media page", () => {
    cy.get("#media_cancel").should("exist");
    cy.get("#save_media").should("exist");
    cy.get("#back_to_list").should("exist");
  });

  it("It goes back to list (cancel)", () => {
    cy.get("#media_cancel").click();
    cy.get("#media-list-title").should("exist");
  });

  it("It goes back to list (back)", () => {
    cy.get("#back_to_list").click();
    cy.get("#media-list-title").should("exist");
  });
});
