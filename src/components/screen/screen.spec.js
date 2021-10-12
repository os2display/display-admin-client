Cypress.on("uncaught:exception", () => {
  // @TODO: fix when docker setup is fixed
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("screen pages work", () => {
  it("It loads create screen page", () => {
    cy.visit("/screen/create");
    cy.get("#save_screen")
      .invoke("text")
      .should("match", /^Gem screen/);
  });

  it("It can select playlist", () => {
    cy.visit("/screen/create");
    cy.get("tbody").should("not.exist");
    cy.get(".dropdown-heading").eq(0).click();
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get(".dropdown-heading").eq(0).click();
    cy.get("tbody").find("tr td").should("have.length", 2);
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").should("not.exist");
  });

  it("It loads create screen page", () => {
    cy.visit("/screen/create");
    cy.get("#save_screen")
      .invoke("text")
      .should("match", /^Gem screen/);
  });

  it("It loads template data", () => {
    cy.visit("/screen/create");
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
    cy.visit("/screen/create");
    cy.get("select").select("Quote");
    cy.get("#save_screen").click();
    cy.url().should("include", "screen/edit/");
  });

  it("It cancels create screen", () => {
    cy.visit("/screen/create");
    cy.get("#cancel_screen").should("exist");
    cy.get("#cancel_screen").click();
    cy.get("#cancel_screen").should("not.exist");
  });
});
