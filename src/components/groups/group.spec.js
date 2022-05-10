describe("Group pages work", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.visit("/group/create");
    cy.get("#login").click();
  });

  it("It loads create group page", () => {
    cy.get("#save_group").should("exist");
  });

  it("It redirects on save", () => {
    // Mock error response on post
    cy.intercept("POST", "**/screen-groups", {
      statusCode: 201,
      fixture: "groups/group-successful.json",
    });

    // Mock successful response on get
    cy.intercept("GET", "**/screen-groups/*", {
      fixture: "groups/group-successful.json",
    });

    // Displays success toast and redirects
    cy.get(".Toastify").find(".Toastify__toast--success").should("not.exist");
    cy.get("#save_group").click();
    cy.get(".Toastify").find(".Toastify__toast--success").contains("gemt");
    cy.url().should("include", "group/list");
  });

  it("It cancels create group", () => {
    cy.get("#cancel_group").should("exist");
    cy.get("#cancel_group").click();
    cy.get("#cancel_group").should("not.exist");
  });

  it("It display error toast on save error", () => {
    // Mock error response on post
    cy.intercept("POST", "**/screen-groups", {
      statusCode: 500,
      fixture: "error.json",
    });

    // Displays error toast and stays on page
    cy.get(".Toastify").find(".Toastify__toast--error").should("not.exist");
    cy.get("#save_group").click();
    cy.get(".Toastify")
      .find(".Toastify__toast--error")
      .contains("An error occurred");
    cy.url().should("include", "group/create");
  });
});
