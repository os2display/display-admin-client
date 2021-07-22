describe("Navbar loads", () => {
  it("It loads", () => {
    cy.visit("/tags");
    cy.get("nav").should("exist");
  });

  it("It navigates", () => {
    cy.visit("/slides");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
    cy.get("#navbar_tags").click();
    cy.get("h1").invoke("text").should("match", /^Tags/);
    cy.get("#navbar_slides").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
    cy.get("#navbar_screens").click();
    cy.get("#navbar_screens_screens").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Skærme/);
    cy.get("#navbar_screens").click();
    cy.get("#navbar_screens_groups").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Grupper/);
    cy.get("#navbar_screens").click();
    cy.get("#navbar_screens_locations").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Lokationer/);
    cy.get("#navbar_categories").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Kategorier/);
  });
});
