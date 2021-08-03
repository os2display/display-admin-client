Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("Slides list tests", () => {
  beforeEach(() => {
    cy.visit("/slides");
  });
  it("It loads slides list", () => {
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 100);
  });

  it("It goes to edit (slides list)", () => {
    cy.get("#slideName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#slideName").should("exist");
  });
  it("It opens delete modal (slides list)", () => {
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(2).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (slides list)", () => {
    cy.visit("/slides");
    cy.get("thead").find("th").should("have.length", 10);
  });
});
