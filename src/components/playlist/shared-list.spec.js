describe("Shared list tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/playlists*", {
      fixture: "playlists/playlists.json",
    }).as("playlists");

    cy.visit("/shared/list");
    cy.get("#login").click();
    cy.wait(["@playlists", "@playlists", "@token"]);
  });
  it("It loads shared playlist list", () => {
    cy.visit("/shared/list");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("exist");
  });

  it("A shared playlist should not be editable or deletable", () => {
    // Mock successful response on get
    cy.intercept("GET", "**/playlists/*", {
      fixture: "playlists/playlist-successful.json",
    });

    cy.get("#delete-button").should("not.exist");
    cy.get("#clear-rows-button").should("not.exist");
    cy.get("tbody").find("tr td a").should("not.exist");
    cy.get("tbody").find("btn btn-danger").should("not.exist");
  });

  it("The correct amount of column headers loaded (shared playlist list)", () => {
    cy.get("thead").find("th").should("have.length", 3);
  });
});
