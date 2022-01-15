describe("themes list tests", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "**/theme*",
      query: {
        page: "1",
      },
    }).as("themesData");
    cy.visit("/themes/list");
    cy.wait(["@themesData"]);
    cy.wait(1000);
  });

  it("It loads themes list", () => {
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("exist");
  });

  it("It goes to edit (themes list)", () => {
    cy.get("#themeTitle").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#themeTitle").should("exist");
  });

  it("It opens delete modal (themes list)", () => {
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(2).should("be.disabled");
    cy.get("tbody").find("tr").eq(0).find("td button").eq(1).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (themes list)", () => {
    cy.get("thead").find("th").should("have.length", 6);
  });

  it("It removes all selected", () => {
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
