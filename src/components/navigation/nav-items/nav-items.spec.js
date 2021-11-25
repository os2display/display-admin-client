describe("Nav items loads", () => {
  it("It loads", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("nav").should("exist");
  });

  it("It navigates to slides list", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
  });

  it("It navigates to media list", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("#nav-items_content_media").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Medier/);
  });

  it("It navigates to slides list", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("#nav-items_content_media").click();
    cy.get("#nav-items_content_slides").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Slides/);
  });

  it("It navigates to screens list", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("#nav-items_screens_screens").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Skærme/);
  });
  it("It navigates to groups list", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("#nav-items_screens_groups").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Grupper/);
  });
  it("It navigates to playlists list", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("#nav-items_playlists_playlists").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Spillelister/);
  });
  it("It navigates to themes list", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("#nav-items_configuration_themes").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Temaer/);
  });

  it("It navigates to create slide", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("#nav-add-new-slide").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret nyt slide/);
  });



  it("It navigates to create playlist", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("#nav-add-new-playlist").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny spilleliste/);
  });


  it("It navigates to create slide", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk");
    cy.get("#nav-add-new-screen").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny skærm/);
  });

});
