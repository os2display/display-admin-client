describe("Simple app loads", () => {
  it("Loads and simple test", () => {
    cy.intercept("GET", "**/slides*", {
      fixture: "slides/slides.json",
    }).as("slides");
    cy.visit("/slide/list?published=all&page=1&order=asc&sort=title");
    cy.wait([
      "@slides"]);
    cy.get("tbody").find("tr").should("have.length", 10);
  });
});
