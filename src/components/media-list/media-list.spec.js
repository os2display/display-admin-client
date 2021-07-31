describe("media-list list tests", () => {
  it("It loads media list", () => {
    cy.visit("/media-list");
    cy.get(".image-list").should("not.be.empty");
    cy.get(".image-wrapper").should("have.length", 12);
  });

  it("It filters list by tags (media-list)", () => {
    cy.visit("/media-list");
    cy.get(".image-list").should("not.be.empty");
    cy.get(".image-wrapper").should("have.length", 12);
    cy.get(".dropdown-heading").eq(0).click();
    cy.get('[type="checkbox"]').eq(2).check();
    cy.get(".dropdown-heading").eq(0).click();
    cy.get(".image-wrapper").should("have.length", 9);
    cy.visit("/media-list?tags=matrices%401%2Ctest%402%2Csystem-worthy%403");
    cy.get(".image-wrapper").should("have.length", 11);
  });

  it("It selects images (media-list)", () => {
    cy.visit("/media-list");
    cy.get("#delete_media_button").should("be.disabled");
    cy.get(".image-list").find("button").eq(0).click();
    cy.get(".image-list")
      .find("button")
      .eq(0)
      .find("img")
      .should("have.class", "selected");
    cy.get("#delete_media_button").should("not.be.disabled");
  });

  it("It opens delete modal (media-list)", () => {
    cy.visit("/media-list");
    cy.get("#delete-modal").should("not.exist");
    cy.get(".image-list").find("button").eq(0).click();
    cy.get("#delete_media_button").click();
    cy.get("#delete-modal").should("exist");
  });
});
