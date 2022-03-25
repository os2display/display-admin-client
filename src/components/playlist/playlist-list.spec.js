describe("Playlists list tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/playlists*", {
      fixture: "playlists/playlists.json",
    }).as("playlists");

    cy.intercept("GET", "**/slides*", {
      fixture: "playlists/playlist-slide.json",
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
  });
  it("It loads playlist list", () => {
    cy.visit("/playlist/list");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("exist");
  });

  it("It goes to edit (playlist list)", () => {
    // Mock successful response on get
    cy.intercept("GET", "**/playlists/*", {
      fixture: "playlists/playlist-successful.json",
    });

    cy.get("#playlistTitle").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();

    cy.get("#playlistTitle").should("exist");
  });

  it("It opens delete modal (playlist list)", () => {
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(2).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (playlist list)", () => {
    cy.get("thead").find("th").should("have.length", 6);
  });

  it("It removes all selected", () => {
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
