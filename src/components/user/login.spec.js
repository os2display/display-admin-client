describe("Login works", () => {
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

    cy.get(".topbar")
      .find(".name")
      .should("have.text", "John Doe (ABC Tenant)");
    cy.get(".dropdown-toggle").find(".dropdown-toggle").click();
    cy.get("#DEF").click();
    cy.wait(["@groups-two"]);
    cy.get(".topbar")
      .find(".name")
      .should("have.text", "John Doe (DEF Tenant)");
  });

  it("Login with tenant that has role editor", () => {
    cy.visit("/playlist/list");
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token-role-editor.json",
    }).as("token");

    cy.intercept("GET", "**/screen-groups*", {
      fixture: "groups/groups.json",
    }).as("groups");

    cy.visit("/group/list");

    cy.get("#login").click();
    cy.wait(["@token"]);
    cy.get(".name").should("have.text", "John Doe (ABC Tenant)");
    cy.get(".sidebar-nav").find(".nav-item").should("have.length", 3);
  });

  it("Role editor should not be able to visit restricted route", () => {
    cy.visit("/playlist/list");
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token-role-editor.json",
    }).as("token");

    cy.intercept("GET", "**/screen-groups*", {
      fixture: "groups/groups.json",
    }).as("groups");

    cy.visit("/shared/list");

    cy.get("#login").click();
    cy.wait(["@token"]);
    cy.get("main")
      .find("div")
      .should("have.text", "Du har ikke adgang til denne side");
  });

  it("Login with tenant that has role admin", () => {
    cy.visit("/playlist/list");
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");

    cy.intercept("GET", "**/screen-groups*", {
      fixture: "groups/groups.json",
    }).as("groups");

    cy.visit("/group/list");

    cy.get("#login").click();
    cy.wait(["@token"]);
    cy.get(".name").should("have.text", "John Doe (ABC Tenant)");
    cy.get(".sidebar-nav").find(".nav-item").should("have.length", 10);
  });
});
