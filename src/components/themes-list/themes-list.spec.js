describe("Themes list tests", () => {
  it("It loads themes list", () => {
    cy.visit("/themes");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 32);
  });

  it("It goes to edit (themes list)", () => {
    cy.visit("/themes");
    cy.get("#themeName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#themeName").should("exist");
  });
  it("It opens delete modal (themes list)", () => {
    cy.visit("/themes");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (themes list)", () => {
    cy.visit("/themes");
    cy.get("thead").find("th").should("have.length", 8);
  });
});
