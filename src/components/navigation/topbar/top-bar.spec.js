describe("Nav items loads", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.visit("");
    cy.intercept("GET", "**/layouts*", { fixture: "screens/layouts.json" }).as(
      "layouts"
    );
    cy.visit("/screen/create");
    cy.get("#login").click();
    cy.wait(["@layouts"]);
  });
  it("It loads", () => {
    cy.get("nav").should("exist");
  });

  it("It navigates to slides list", () => {
    cy.get("#nav-items_content_slides").click();
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
  it("It loads different menu on smaller screens", () => {
    cy.viewport(550, 750);
    cy.get("#basic-navbar-nav-burger").should("exist");
    cy.get(".name").should("exist");
    cy.get("#top-bar-brand").should("exist");
    cy.get("#sidebar").should("not.be.visible");
    cy.get("#topbar_signout").should("not.be.visible");
    cy.get("#basic-navbar-nav-burger").click();
    cy.get("#basic-navbar-nav").should("exist");
    cy.get("#basic-navbar-nav").find(".nav-item").should("have.length", 12);
    cy.get("#basic-navbar-nav").find(".nav-add-new").should("have.length", 4);
    cy.get("#basic-navbar-nav").find("#topbar_signout").should("be.visible");
  });
});
