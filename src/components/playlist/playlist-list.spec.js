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
    cy.get("thead").find("th").should("have.length", 7);
  });

  it("It removes all selected", () => {
    cy.get("tbody").find("tr td input").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });

  it("Published dates", () => {
    const twentyNinthOfMarch = new Date("2022-03-29T12:30:00.000Z");

    // Sets time to a specific date, in this case 2022-03-24
    cy.clock(twentyNinthOfMarch);

    cy.intercept("GET", "**/playlists*", {
      fixture: "published/published-in-playlist.json",
    }).as("published-in-playlist");

    cy.intercept("GET", "**/slides*", {
      fixture: "playlists/playlist-slide.json",
    }).as("slides");

    cy.visit("/playlist/list");
    cy.get("tbody")
      .find("tr td")
      .eq(3)
      .should(
        "have.text",
        "Fra: torsdag d. 24. marts 2022 kl. 17:31Til: fredag d. 1. april 2022 kl. 14:31"
      );
    cy.get("tbody")
      .find("tr td")
      .eq(10)
      .should("have.text", "Fra: fredag d. 18. marts 2022 kl. 16:04Til: -");
    cy.get("tbody")
      .find("tr td")
      .eq(17)
      .should("have.text", "Fra: -Til: lørdag d. 26. marts 2022 kl. 15:25");
    cy.get("tbody").find("tr td").eq(24).should("have.text", "Ja");
  });

  it("Playing dates", () => {
    const twentyNinthOfMarch = new Date("2022-03-29T12:30:00.000Z");

    // Sets time to a specific date, in this case 2022-03-24
    cy.clock(twentyNinthOfMarch);

    cy.intercept("GET", "**/playlists*", {
      fixture: "published/played-in-playlist.json",
    }).as("played-in-playlist");

    cy.intercept("GET", "**/slides*", {
      fixture: "playlists/playlist-slide.json",
    }).as("slides");

    cy.visit("/playlist/list");
    cy.get("tbody").find("tr td").eq(4).should("have.text", "Afspilles");
    cy.get("tbody").find("tr td").eq(11).should("have.text", "Afspillet");
    cy.get("tbody").find("tr td").eq(18).should("have.text", "Fremtidig");
  });
});
