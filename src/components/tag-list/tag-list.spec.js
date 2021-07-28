describe("Tags list tests", () => {
  it("It loads tags list", () => {
    cy.visit("/tags");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 60);
  });

  it("It goes to edit (tags list)", () => {
    cy.visit("/tags");
    cy.get("#tagName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#tagName").should("exist");
  });
  it("It opens delete modal (tags list)", () => {
    cy.visit("/tags");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The column headers are correct (tags list)", () => {
    cy.visit("/tags");
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
      .should("match", /^# slides/);
  });
});
