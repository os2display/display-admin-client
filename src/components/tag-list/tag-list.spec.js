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
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (tags list)", () => {
    cy.visit("/tags");
    cy.get("thead").find("th").should("have.length", 6);
  });

  it("It removes all selected", () => {
    cy.visit("/tags");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
