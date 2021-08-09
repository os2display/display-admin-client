describe("Edit user page tests", () => {
  it("It loads edit new user", () => {
    cy.visit("/user/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny bruger/);
    cy.visit("/user/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger følgende bruger: matrices/);
  });

  it("It validates new user", () => {
    cy.visit("/user/new");
    cy.get("#save_user")
      .invoke("text")
      .should("match", /^Gem bruger/);
    cy.get("#save_user").click();
    cy.get("#save_user")
      .invoke("text")
      .should("match", /^Gem bruger/);
    cy.get("input").type("x");
    cy.get("#save_user").click();
    cy.get("#save_user").should("not.exist");
  });

  it("It validates already existing user", () => {
    cy.visit("/user/32");
    cy.get("#userName").clear();
    cy.get("#save_user")
      .invoke("text")
      .should("match", /^Gem bruger/);
    cy.get("#save_user").click();
    cy.get("#save_user")
      .invoke("text")
      .should("match", /^Gem bruger/);
    cy.get("#userName").type("x");
    cy.get("#save_user").click();
    cy.get("#save_user").should("not.exist");
  });
});
