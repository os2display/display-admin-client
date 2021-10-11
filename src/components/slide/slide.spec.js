Cypress.on("uncaught:exception", () => { // @TODO: fix when docker setup is fixed
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("Slide pages work", () => {
  it("It loads create slide page", () => {
    cy.visit("/slide/create");
    cy.get("#save_slide")
      .invoke("text")
      .should("match", /^Gem slide/);
  });

  it("It can select playlist", () => {
    cy.visit("/slide/create");
    cy.get("tbody").should("not.exist");
    cy.get(".dropdown-heading").eq(0).click();
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get(".dropdown-heading").eq(0).click();
    cy.get("tbody").find("tr td").should("have.length", 2);
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").should("not.exist");
  });

  it("It loads create slide page", () => {
    cy.visit("/slide/create");
    cy.get("#save_slide")
      .invoke("text")
      .should("match", /^Gem slide/);
  });

  it("It loads template data", () => {
    cy.visit("/slide/create");
    cy.get("section")
      .eq(2)
      .invoke("text")
      .should("not.match", /^Todo template data section/);
    cy.get("select").select("Quote");
    cy.get("section")
      .eq(2)
      .invoke("text")
      .should("match", /^Todo template data section/);
  });

  it("It redirects on save", () => {
    cy.visit("/slide/create");
    cy.get("select").select("Quote");
    cy.get("#save_slide").click();
    cy.url().should("include", "slide/edit/");
  });

  it("It cancels create slide", () => {
    cy.visit("/slide/create");
    cy.get("#cancel_slide").should("exist");
    cy.get("#cancel_slide").click();
    cy.get("#cancel_slide").should("not.exist");
  });
});
