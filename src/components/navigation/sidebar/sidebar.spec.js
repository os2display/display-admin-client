describe("Sidebar loads", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/themes*", {
      fixture: "themes/themes-first-page.json",
    }).as("themesData");
    cy.visit("/admin/themes/list");
    cy.get("#login").click();
    cy.wait(["@themesData"]);
  });
  it("It loads", () => {
    cy.get("#sidebar").should("exist");
  });
});
