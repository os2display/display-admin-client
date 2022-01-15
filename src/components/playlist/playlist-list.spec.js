describe("Playlists list tests", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "**/playlists*",
      query: {
        page: "1",
      },
    }).as("playlistsData");
    cy.intercept({
      method: "GET",
      url: "**/slides*",
    }).as("slidesData");
    cy.visit("/playlist/list");
    cy.wait([
      "@playlistsData",
      "@slidesData",
      "@slidesData",
      "@slidesData",
      "@slidesData",
      "@slidesData",
      "@slidesData",
      "@slidesData",
      "@slidesData",
      "@slidesData",
      "@slidesData",
    ]);
    cy.wait(1000)
  });
  it("It loads playlist list", () => {
    cy.visit("/playlist/list");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("exist");
  });

  it("It opens info modal (playlist list)", () => {
    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#info-modal").should("exist");
  });

  it("It goes to edit (playlist list)", () => {
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
