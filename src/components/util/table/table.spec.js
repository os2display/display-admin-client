describe("Table loads", () => {
  it("It loads", () => {
    cy.intercept("GET", "**/themes*", {
      fixture: "themes/themes-first-page.json",
    }).as("themesData");
    cy.visit("/themes/list");
    cy.wait(["@themesData"]);
    cy.get("tbody").should("not.be.empty");
  });
});
