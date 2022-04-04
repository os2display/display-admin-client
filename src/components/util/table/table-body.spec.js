describe("Table body loads", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/themes*", {
      fixture: "themes/themes-first-page.json",
    }).as("themesData");
    cy.visit("/themes/list");
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.visit("/themes/list");
    cy.get("#login").click();
    cy.wait(["@themesData", "@token"]);
  });

  it("It loads", () => {
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 50);
  });
});
