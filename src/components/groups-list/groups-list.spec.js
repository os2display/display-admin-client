describe("Groups list tests", () => {
  it("It loads groups list", () => {
    cy.visit("/groups");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 20);
  });

  it("It goes to edit (groups list)", () => {
    cy.visit("/groups");
    cy.get("#groupName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#groupName").should("exist");
  });
  it("It opens delete modal (groups list)", () => {
    cy.visit("/groups");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("#delete-modal").should("exist");
  });
  it("The column headers are correct (groups list)", () => {
    cy.visit("/groups");
    cy.get("thead").find("th").eq(0).invoke("text").should("match", /^Valg/);
    cy.get("thead").find("th").eq(1).invoke("text").should("match", /^Navn/);
    cy.get("thead")
      .find("th")
      .eq(2)
      .invoke("text")
      .should("match", /^Oprettet af/);
  });
});
