describe("themes list tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/themes*", {
      fixture: "themes/themes-first-page.json",
    }).as("themesData");
    cy.visit("/themes/list");
    cy.get("#login").click();
    cy.wait(["@themesData", "@token"]);
  });

  it("It loads themes list", () => {
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("exist");
  });

  it("It goes to edit (themes list)", () => {
    cy.get("#themeTitle").should("not.exist");

    // Mock successful response on get
    cy.intercept("GET", "**/themes/*", {
      fixture: "themes/theme-successful.json",
    });

    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#themeTitle").should("exist");
  });

  it("It opens delete modal (themes list)", () => {
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").eq(0).find(".remove-from-list").eq(1).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (themes list)", () => {
    cy.get("thead").find("th").should("have.length", 5);
  });

  it("It removes all selected", () => {
    cy.get("tbody").find("tr td input").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
