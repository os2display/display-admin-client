describe("Locations list tests", () => {
  it("It loads locations list", () => {
    cy.visit("/locations");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 28);
  });

  it("It opens info modal (locations list)", () => {
    cy.visit("/locations");
    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("#info-modal").should("exist");
    cy.visit("/locations");
    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#info-modal").should("exist");
  });

  it("It goes to edit (locations list)", () => {
    cy.visit("/locations");
    cy.get("#locationName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#locationName").should("exist");
  });
  it("It opens delete modal (locations list)", () => {
    cy.visit("/locations");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(2).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The column headers are correct", () => {
    cy.visit("/locations (locations list)");
    cy.get("thead").find("th").eq(0).invoke("text").should("match", /^Valg/);
    cy.get("thead").find("th").eq(1).invoke("text").should("match", /^Navn/);
    cy.get("thead")
      .find("th")
      .eq(2)
      .invoke("text")
      .should("match", /^Oprettet af/);
    cy.get("thead")
      .find("th")
      .eq(3)
      .invoke("text")
      .should("match", /^# skærme/);
    cy.get("thead")
      .find("th")
      .eq(4)
      .invoke("text")
      .should("match", /^# grupper/);
  });
});
