describe("Edit playlist page tests", () => {
  it("It loads a playlists", () => {
    cy.visit("/playlist/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny spilleliste/);
    cy.visit("/playlist/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger følgende spilleliste: Sommerplaylist/);
  });

  it("It validates new playlist", () => {
    cy.visit("/playlist/new");
    cy.get("#save_playlist").should("exist");
    cy.get("#save_playlist").click();
    cy.get("#save_playlist").should("exist");
    cy.get("#playlistName").type("x");
    cy.get("#save_playlist").click();
    cy.get("#save_playlist").should("not.exist");
  });

  it("It removes from screens list", () => {
    cy.visit("/playlist/32");
    cy.get("tbody").eq(0).find("tr td").should("have.length", 7);
    cy.get("tbody").eq(0).find("tr td button").eq(1).click();
    cy.get("tbody").should("have.length", 1);
  });

  it("It opens info modal in screens list", () => {
    cy.visit("/playlist/32");
    cy.get("#drag-and-drop-table").find("tr td button").eq(0).click();
    cy.get("#info-modal").should("exist");
  });

  it("It removes from drag-drop table", () => {
    cy.visit("/playlist/32");
    cy.get("#drag-and-drop-table").find("tr td").should("have.length", 6);
    cy.get("#drag-and-drop-table").find("tr td button").eq(1).click();
    cy.get("#drag-and-drop-table").should("not.exist");
  });

  it("It opens info modal drag-drop table", () => {
    cy.visit("/playlist/32");
    cy.get("#info-modal").should("not.exist");
    cy.get("#drag-and-drop-table").find("tr td button").eq(0).click();
    cy.get("#info-modal").should("exist");
  });

  it("It validates already existing playlist", () => {
    cy.visit("/playlist/32");
    cy.get("#playlistName").clear();
    cy.get("#save_playlist").should("exist");
    cy.get("#save_playlist").click();
    cy.get("#save_playlist").should("exist");
    cy.get("#playlistName").type("x");
    cy.get("#save_playlist").click();
    cy.get("#save_playlist").should("not.exist");
  });
});
