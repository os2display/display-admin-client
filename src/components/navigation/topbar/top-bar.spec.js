describe("Topbar loads", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/slides*", {
      fixture: "slides/slides.json",
    }).as("slides");
    cy.visit("/slide/list?published=all&page=1&order=asc&sort=title");
    cy.wait([
      "@slides"]);
  });
  it("It loads", () => {
    cy.get("#topbar").should("exist");
  });

  it("It navigates", () => {
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
    cy.get("#topbar_add").click();
    cy.get("#nav-items_add_screen").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny skærm/);

    cy.get("#nav-items_add_playlist").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny spilleliste/);

    cy.get("#nav-items_add_slide").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret nyt slide/);
  });
});
