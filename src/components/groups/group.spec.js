Cypress.on("uncaught:exception", () => {
  // @TODO: fix when docker setup is fixed
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("group pages work", () => {
  it("It loads create group page", () => {
    cy.visit("/group/create");
    cy.get("#save_group")
      .invoke("text")
      .should("match", /^Gem group/);
  });

  it("It loads create group page", () => {
    cy.visit("/group/create");
    cy.get("#save_group")
      .invoke("text")
      .should("match", /^Gem gruppe/);
  });

  it("It redirects on save", () => {
    cy.visit("/group/create");
    cy.get("#save_group").click();
    cy.url().should("include", "group/edit/");
  });

  it("It cancels create group", () => {
    cy.visit("/group/create");
    cy.get("#cancel_group").should("exist");
    cy.get("#cancel_group").click();
    cy.get("#cancel_group").should("not.exist");
  });
});
