describe("Edit media page tests", () => {
  it("It loads a image uploader", () => {
    cy.visit("/media/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Upload/);
    cy.visit("/media/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger: Et bjerg 1/);
  });

  it("It validates new media", () => {
    cy.visit("/media/new");
    cy.get("#save_media").should("exist");
    cy.get(".invalid-feedback-image-uploader").should("not.exist");
    cy.get("#save_media").click();
    cy.get("#save_media").should("exist");
    cy.get(".invalid-feedback-image-uploader").should("exist");
  });

  it("It validates already existing media", () => {
    cy.visit("/media/2");
    cy.get("#mediaName").clear();
    cy.get("#save_media")
      .invoke("text")
      .should("match", /^Gem medie/);
    cy.get("#save_media").click();
    cy.get("#mediaName").type("x");
    cy.get("#save_media").click();
    cy.get("#save_media").should("not.exist");
  });
});
