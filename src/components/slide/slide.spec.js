describe("Slide pages work", () => {
  it("It loads create slide page", () => {
    cy.visit("/slide/create");
    cy.get("#save_slide").should("exist");
  });

  it("It picks template and redirects on save", () => {
    cy.visit("/slide/create");

    // Pick a template
    cy.get("#template-section")
      .find(".dropdown-container")
      .eq(0)
      .type("{enter}");
    cy.get("#template-section")
      .find(".item-renderer")
      .find("span")
      .eq(3)
      .invoke("text")
      .then((selectedTemplateTitle) => {
        cy.get("#template-section").find('[type="checkbox"]').eq(3).check();
        cy.get("#template-section")
          .find(".dropdown-heading-value")
          .contains(selectedTemplateTitle);
      });
    cy.get("#template-section").find(".dropdown-container").eq(0).click();

    // Mock successful response on post
    cy.intercept("POST", "**/slides", {
      statusCode: 201,
      fixture: "save-slides-response.json",
    });

    // Mock successful response on get
    cy.intercept("GET", "**/slides/*", {
      fixture: "save-slides-response.json",
    });

    // Displays success toast and redirects
    cy.get(".Toastify").find(".Toastify__toast--success").should("not.exist");
    cy.get("#save_slide").click();
    cy.get(".Toastify").find(".Toastify__toast--success").contains("gemt");
    cy.url().should("include", "slide/edit/");

    cy.get("#title")
      .invoke("val")
      .should("match", /^title/);
  });

  it("It display error toast on save error", () => {
    cy.visit("/slide/create");

    // Mock error response on post
    cy.intercept("POST", "**/slides", {
      statusCode: 500,
      fixture: "error.json",
    });

    // Displays error toast and stays on page
    cy.get(".Toastify").find(".Toastify__toast--error").should("not.exist");
    cy.get("#save_slide").click();
    cy.get(".Toastify").find(".Toastify__toast--error").should("exist");
    cy.get(".Toastify")
      .find(".Toastify__toast--error")
      .contains("Errorerrorerror");
    cy.url().should("include", "slide/create");
  });

  it("It cancels create slide", () => {
    cy.visit("/slide/create");
    cy.get("#cancel_slide").should("exist");
    cy.get("#cancel_slide").click();
    cy.get("#cancel_slide").should("not.exist");
  });

  it("It shows and hides preview", () => {
    cy.visit("/slide/create");

    // Neither the sidebar or overlay should be displayed
    cy.get(".responsive-side").should("not.exist");
    cy.get("#formBasicCheckboxshow-preview").should("not.exist");

    // Pick a template to get the preview section visible
    cy.get("#template-section")
      .find(".dropdown-container")
      .eq(0)
      .type("{enter}");
    cy.get("#template-section").find('[type="checkbox"]').check();
    cy.get("#template-section").find(".dropdown-container").eq(0).click();

    // Preview checkbox cheked and sidebar should be displayed
    cy.get("#formBasicCheckboxshow-preview").check();
    cy.get(".responsive-side").should("exist");
    cy.get(".preview-overlay").should("not.exist");

    // Open preview overlay
    cy.get("#preview_slide").click();
    cy.get(".preview-overlay").should("exist");
    cy.get("#close_preview_button").click();

    // Redirects, goes back and responsive side is opened due to local storage
    cy.get("#cancel_slide").click();
    cy.visit("/slide/create");
    cy.get(".responsive-side").should("exist");
  });

  it("It saves theme in localstorage", () => {
    cy.visit("/slide/create");

    // The theme dropdown should not have a selected
    cy.get("#theme-section")
      .find(".dropdown-heading-value")
      .invoke("text")
      .should("match", /^Vælg en af mulighederne/);

    // Select a theme
    cy.get("#theme-section").find(".dropdown-container").eq(0).type("{enter}");
    cy.get("#theme-section").find('[type="checkbox"]').check();

    // Mock successful response on post
    cy.intercept("POST", "**/slides", {
      statusCode: 201,
      fixture: "save-slides-response.json",
    });

    // Get the selected theme, to see if it is saved when create slide is visited again
    cy.get("#theme-section")
      .find(".dropdown-heading-value")
      .eq(0)
      .invoke("text")
      .then((selectedTheme) => {
        cy.get("#theme-section").find(".dropdown-container").eq(0).click();
        // The theme is saved in local storage on save slide
        cy.get("#save_slide").click();
        cy.visit("/slide/create");
        cy.get("#theme-section")
          .find(".dropdown-heading-value")
          .contains(selectedTheme);
      });
  });
});
