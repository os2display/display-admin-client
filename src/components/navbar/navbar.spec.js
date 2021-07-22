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
    cy.get("h1")
      .invoke("text")
      .should("match", /^Tags/);
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
    cy.get("#navbar_categories").click();
    cy.get("h1")
      .invoke("text")
      .should("match", /^Kategorier/);
  });

  // it("The column headers are correct", () => {
  //   cy.visit("/tags");
  //   cy.get("thead").find("th").eq(0).invoke("text").should("match", /^Valg/);
  //   cy.get("thead").find("th").eq(1).invoke("text").should("match", /^Navn/);
  //   cy.get("thead")
  //     .find("th")
  //     .eq(2)
  //     .invoke("text")
  //     .should("match", /^Oprettet af/);
  //   cy.get("thead")
  //     .find("th")
  //     .eq(3)
  //     .invoke("text")
  //     .should("match", /^# slides/);
  // });
});
