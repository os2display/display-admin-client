describe("Simple app loads", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/slides*", {
      fixture: "slides/slides.json",
    }).as("slides");
    cy.visit("/admin/slide/list?published=all&page=1&order=asc&sort=title");
    cy.get("#login").click();
    cy.wait(["@slides", "@token"]);
  });

  it("Loads and simple test", () => {
    cy.get("tbody").should("exist");
  });
});
