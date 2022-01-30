describe("Group pages work", () => {
  it("It loads create group page", () => {
    cy.visit("/group/create");
    cy.get("#save_group").should("exist");
  });

  it("It redirects on save", () => {
    cy.visit("/group/create");

    // Mock error response on post
    cy.intercept("POST", "**/screen-groups", {
      statusCode: 201,
      fixture: "save-groups-response.json",
    });

    // Mock successful response on get
    cy.intercept("GET", "**/screen-groups/*", {
      fixture: "save-groups-response.json",
    });

    // Displays success toast and redirects
    cy.get(".Toastify").find(".Toastify__toast--success").should("not.exist");
    cy.get("#save_group").click();
    cy.get(".Toastify").find(".Toastify__toast--success").contains("gemt");
    cy.url().should("include", "group/edit/");

    cy.get("#title")
      .invoke("val")
      .should("match", /^title/);
  });

  it("It cancels create group", () => {
    cy.visit("/group/create");
    cy.get("#cancel_group").should("exist");
    cy.get("#cancel_group").click();
    cy.get("#cancel_group").should("not.exist");
  });

  it("It display error toast on save error", () => {
    cy.visit("/group/create");

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
      .contains("Errorerrorerror");
    cy.url().should("include", "group/create");
  });
});
