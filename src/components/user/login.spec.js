describe("Login works", () => {
  beforeEach(() => {
    // // Mock successful response on get tenants
    // cy.intercept("GET", "**/tenants*", {
    //   statusCode: 201,
    //   fixture: "playlists/tenants.json",
    // }).as("tenants");
    // cy.visit("/playlist/list");
    // cy.intercept("POST", "**/token", {
    //   statusCode: 201,
    //   fixture: "token.json",
    // }).as("token");
    // cy.intercept("GET", "**/slides*", {
    //   fixture: "playlists/playlist-slide.json",
    // }).as("slides");
    // cy.visit("/playlist/create");
    // cy.get("#login").click();
    // cy.wait(["@slides", "@token", "@tenants"]);
  });

  it("Login one tenant works", () => {
    cy.visit("/playlist/list");
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");

    cy.intercept("GET", "**/screen-groups*", {
      fixture: "groups/groups.json",
    }).as("groups");

    cy.visit("/group/list");

    //
    cy.get("#login").click();
    cy.wait(["@token"]);
    cy.get(".name").should("have.text", "John Doe (ABC Tenant)");
  });

  it("Login three tenant works", () => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token-two-tenants.json",
    }).as("token");

    cy.intercept("GET", "**/screen-groups*", {
      fixture: "groups/groups.json",
    }).as("groups");

    cy.visit("/group/list");

    cy.get("#login").click();

    cy.intercept("GET", "**/screen-groups*", {
      fixture: "groups/groups.json",
    }).as("groups-two");

    cy.get("#tenant-picker-section")
      .find(".dropdown-container")
      .eq(0)
      .type("{enter}");

    cy.wait(["@token"]);

    cy.get(".user-dropdown-name").should("have.text", "John Doe (ABC Tenant)");
    cy.get(".user-dropdown").get("#topbar_user").click();
    cy.get("#DEF").click();
    cy.wait(["@groups-two"]);
    cy.get(".user-dropdown-name").should("have.text", "John Doe (DEF Tenant)");
  });
});
