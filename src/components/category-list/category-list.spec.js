describe("Categories list tests", () => {
  it("It loads categories list", () => {
    cy.visit("/categories");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 60);
  });
  it("It opens info modal (categories list)", () => {
    cy.visit("/categories");
    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#info-modal").should("exist");
  });

  it("It goes to edit (categories list)", () => {
    cy.visit("/categories");
    cy.get("#categoryName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#categoryName").should("exist");
  });
  it("It opens delete modal (categories list)", () => {
    cy.visit("/categories");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(2).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (categories list)", () => {
    cy.visit("/categories");
    cy.get("thead").find("th").should("have.length", 6);
  });

  it("It removes all selected", () => {
    cy.visit("/categories");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
