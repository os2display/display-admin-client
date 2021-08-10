describe("Nav items loads", () => {
  it("It loads", () => {
    cy.visit("/tags");
    cy.get("nav").should("exist");
  });

  it("It navigates", () => {
    cy.visit("/slides");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
    cy.get("#nav-items_content_tags").click();
    cy.get("h1").invoke("text").should("match", /^Tags/);
    cy.get("#nav-items_content_media").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Medier/);
    cy.get("#nav-items_content_slides").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
    cy.get("#nav-items_screens_screens").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Skærme/);
    cy.get("#nav-items_screens_groups").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Grupper/);
    cy.get("#nav-items_screens_locations").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Lokationer/);
    cy.get("#nav-items_playlists_categories").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Kategorier/);
    cy.get("#nav-items_playlists_playlists").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Spillelister/);
    cy.get("#nav-items_configuration_themes").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Temaer/);
    cy.get("#nav-items_configuration_users").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Brugere/);
  });
});
