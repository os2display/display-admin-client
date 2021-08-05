describe("Screen list loads", () => {
  it("It loads screens list", () => {
    cy.visit("/screens");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 90);
  });

  it("It goes to edit (screens list)", () => {
    cy.visit("/screens");
    cy.get("#screenName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#screenName").should("exist");
  });
  it("It opens delete modal (screens list)", () => {
    cy.visit("/screens");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(2).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (screens list)", () => {
    cy.visit("/screens");
    cy.get("thead").find("th").should("have.length", 9);
  });

  it("It removes all selected", () => {
    cy.visit("/screens");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
