describe("Slides list tests", () => {
  it("It loads slides list", () => {
    cy.visit("/slides");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 80);
  });

  it("It goes to edit (slides list)", () => {
    cy.visit("/slides");
    cy.get("#slideName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#slideName").should("exist");
  });
  it("It opens delete modal (slides list)", () => {
    cy.visit("/slides");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (slides list)", () => {
    cy.visit("/slides");
    cy.get("thead").find("th").should("have.length", 8);
  });
});
