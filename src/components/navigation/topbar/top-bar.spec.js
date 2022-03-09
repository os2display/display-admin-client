describe("Nav items loads", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.visit("");
    cy.get("#login").click();
  });
  it("It loads", () => {
    cy.get("nav").should("exist");
  });

  it("It navigates to slides list", () => {
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
  });

  it("It navigates to media list", () => {
    cy.get("#nav-items_content_media").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Medier/);
  });

  it("It navigates to slides list", () => {
    cy.get("#nav-items_content_media").click();
    cy.get("#nav-items_content_slides").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
  });

  it("It navigates to screens list", () => {
    cy.get("#nav-items_screens_screens").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Skærme/);
  });
  it("It navigates to groups list", () => {
    cy.get("#nav-items_screens_groups").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Grupper/);
  });
  it("It navigates to playlists list", () => {
    cy.get("#nav-items_playlists_playlists").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Spillelister/);
  });
  it("It navigates to themes list", () => {
    cy.get("#nav-items_configuration_themes").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Temaer/);
  });

  it("It navigates to create slide", () => {
    cy.get("#topbar_add").click();
    cy.get("#nav-add-new-slide").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret nyt slide/);
  });

  it("It navigates to create playlist", () => {
    cy.get("#topbar_add").click();
    cy.get("#nav-add-new-playlist").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny spilleliste/);
  });

  it("It navigates to create slide", () => {
    cy.get("#topbar_add").click();
    cy.get("#nav-add-new-screen").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny skærm/);
  });
});
