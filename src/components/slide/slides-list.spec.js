describe("Slides list tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/slides*", {
      fixture: "slides/slides.json",
    }).as("slides");
    cy.intercept("GET", "**/templates/*", {
      fixture: "slides/templates.json",
    }).as("templates");
    cy.visit("/slide/list");
    cy.get("#login").click();
    cy.wait(["@slides", "@templates", "@templates", "@token"]);
  });

  it("It loads slides list", () => {
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("exist");
  });

  it("It goes to edit (slides list)", () => {
    cy.intercept("GET", "**/slides/*", {
      fixture: "slides/slide-successful.json",
    });

    cy.get("#slidesTitle").should("not.exist");
    cy.get("tbody").find("#edit_button").eq(0).click();
    cy.get("#slidesTitle").should("exist");
  });

  it("The correct amount of column headers loaded (slides list)", () => {
    cy.get("thead").find("th").should("have.length", 8);
  });

  it("It removes all selected", () => {
    cy.get("tbody").find("tr td input").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
