describe("Playlists list loads", () => {
  it("It loads", () => {
    cy.visit("/playlists");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 18);
  });

  it("It opens info modal", () => {
    cy.visit("/playlists");
    cy.get("#info-modal").should("not.exist")
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("#info-modal").should("exist")
    cy.visit("/playlists");
    cy.get("#info-modal").should("not.exist")
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#info-modal").should("exist")
  });

  it("It goes to edit", () => {
    cy.visit("/playlists");
    cy.get("#playlistName").should("not.exist")
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#playlistName").should("exist")
  });
  it("It opens delete modal", () => {
    cy.visit("/playlists");
    cy.get("#delete-modal").should("not.exist")
    cy.get("tbody").find("tr td button").eq(2).click();
    cy.get("#delete-modal").should("exist")
  });

  it("The column headers are correct", () => {
    cy.visit("/playlists");
    cy.get("thead").find("th").eq(0).invoke("text").should("match", /^Valg/);
    cy.get("thead").find("th").eq(1).invoke("text").should("match", /^Navn/);
    cy.get("thead")
      .find("th")
      .eq(2)
      .invoke("text")
      .should("match", /^# slides/);
    cy.get("thead")
      .find("th")
      .eq(3)
      .invoke("text")
      .should("match", /^# kategorier/);
  });
});
