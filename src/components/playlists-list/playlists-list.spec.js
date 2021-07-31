describe("Playlists list tests", () => {
  it("It loads playlist list", () => {
    cy.visit("/playlists");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 18);
  });

  it("It opens info modal (playlist list)", () => {
    cy.visit("/playlists");
    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("#info-modal").should("exist");
    cy.visit("/playlists");
    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#info-modal").should("exist");
  });

  it("It goes to edit (playlist list)", () => {
    cy.visit("/playlists");
    cy.get("#playlistName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#playlistName").should("exist");
  });
  it("It opens delete modal (playlist list)", () => {
    cy.visit("/playlists");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(2).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (playlist list)", () => {
    cy.visit("/playlists");
    cy.get("thead").find("th").should("have.length", 6)
  });

});
