describe("Slides list tests", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "**/templates/*",
    }).as("templatesData");
    cy.intercept({
      method: "GET",
      url: "**/slides*",
      query: {
        page: "2",
      },
    }).as("slidesData");
    cy.visit("/slide/list?published=all&page=2&order=asc&sort=title");
    cy.wait(["@slidesData", "@templatesData"]);
  });

  it("It loads slides list", () => {
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("exist");
  });

  it("It goes to edit (slides list)", () => {
    cy.intercept({
      method: "GET",
      url: "**/templates/01FGC8EXSE1KCC1PTR0NHB0H3R",
    }).as("templatesData");
    cy.wait(["@templatesData"]);
    cy.get("#slidesTitle").should("not.exist");
    cy.get("tbody").find("tr td a").should("exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#slidesTitle").should("exist");
  });

  it("The correct amount of column headers loaded (slides list)", () => {
    cy.get("thead").find("th").should("have.length", 7);
  });

  it("It removes all selected", () => {
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
