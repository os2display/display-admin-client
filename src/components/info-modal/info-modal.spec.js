describe("Info modal tests", () => {
  it("It opens info modal and goes to link (playlist list)", () => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/playlists*", {
      fixture: "playlists/playlists.json",
    }).as("playlists");

    cy.intercept("GET", "**/slides*", {
      fixture: "playlists/slides.json",
    }).as("slides");

    cy.visit("/playlist/list");
    cy.get("#login").click();
    cy.wait([
      "@playlists",
      "@playlists",
      "@token",
      "@slides",
      "@slides",
      "@slides",
      "@slides",
      "@slides",
      "@slides",
      "@slides",
      "@slides",
      "@slides",
      "@slides",
    ]);

    cy.get("#info-modal").should("not.exist");

    cy.intercept("GET", "**/slides*", {
      fixture: "info-modal/slide.json",
    }).as("slide");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.wait("@slide");
    cy.get("#info-modal").should("exist");
    cy.get("#info-modal")
      .find("a")
      .should("have.attr", "href")
      .and("include", "/slide/edit/01FYZYHVMWMB575NPNAX55TK7G");
  });
  it("It opens info modal and goes to link (slides list)", () => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/slides*", {
      fixture: "slides/slides.json",
    }).as("slides");
    cy.intercept("GET", "**/templates/*", {
      fixture: "slides/templates.json",
    }).as("templates");
    cy.intercept("GET", "**/playlists/*", {
      fixture: "info-modal/playlist.json",
    }).as("playlists");
    cy.visit("/slide/list");
    cy.get("#login").click();
    cy.wait(["@slides", "@token"]);

    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.wait(["@playlists"]);
    cy.get("#info-modal").should("exist");

    cy.get("#info-modal")
      .find("a")
      .should("have.attr", "href")
      .and("include", "/playlist/edit/01FYZYGZBJD1651H9MW2FJJD6N");
  });

  it("It opens info modal and goes to link (screens list)", () => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/screen-groups*", {
      fixture: "screens/groups.json",
    }).as("groups");
    cy.intercept("GET", "**/screens*", {
      fixture: "screens/screens.json",
    }).as("screens");
    cy.visit("/screen/list");
    cy.get("#login").click();
    cy.wait(["@screens", "@screens", "@groups", "@groups", "@token"]);

    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td .list-button").eq(1).click();
    cy.get("#info-modal").should("exist");

    cy.get("#info-modal")
      .find("a")
      .should("have.attr", "href")
      .and("include", "/group/edit/000RAH746Q1AD8011Z1JNV06N3");
  });

  it("It opens info modal and goes to link (groups list)", () => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/screen-groups*", {
      fixture: "info-modal/groups.json",
    }).as("groups");

    cy.visit("/group/list");
    cy.get("#login").click();

    cy.intercept("GET", "**/screens*", {
      fixture: "info-modal/screen.json",
    }).as("screen");

    cy.wait(["@groups", "@groups", "@screen", "@screen", "@screen", "@screen"]);

    cy.intercept("GET", "**/screens*", {
      fixture: "info-modal/screen.json",
    }).as("screen");

    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td .list-button").eq(1).click();
    cy.wait("@screen");
    cy.get("#info-modal").should("exist");

    cy.get("#info-modal")
      .find("a")
      .should("have.attr", "href")
      .and("include", "/screen/edit/01FYYRA11JSAPV15H29GGA9P78");
  });
});
