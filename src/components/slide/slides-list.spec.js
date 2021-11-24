
describe("Slides list tests", () => {
  it("It loads slides list", () => {
    cy.visit("/slide/list");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("exist");
  });

  it("It opens info modal (slides list)", () => {
    cy.visit("/slide/list");
    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#info-modal").should("exist");
  });

  it("It goes to edit (slides list)", () => {
    cy.visit("/slide/list");
    cy.get("#slidesTitle").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#slidesTitle").should("exist");
  });

  it("It opens delete modal (slides list)", () => {
    cy.visit("/slide/list");
    cy.get("#delete-modal").should("not.exist");
    cy.wait(500)
    cy.get("tbody").find("tr td button").eq(2).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (slides list)", () => {
    cy.visit("/slide/list");
    cy.get("thead").find("th").should("have.length", 7);
  });

  it("It removes all selected", () => {
    cy.visit("/slide/list");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
