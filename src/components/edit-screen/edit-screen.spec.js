describe("Edit screen page loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/screen/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret nyt screen/);
    cy.visit("localhost:3000/screen/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger følgende screen: matrices/);
  });

  it("It validates", () => {
    cy.visit("localhost:3000/screen/new");
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Gem screen/);
    cy.get(".container").find("button").eq(1).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Gem screen/);

    cy.get("input").type("Hello, World");
    cy.get(".container").find("button").eq(1).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Konsolider/);
  });

  it("It goes back", () => {
    cy.visit("localhost:3000/");
    cy.visit("localhost:3000/screen/new");
    cy.get(".container")
      .find("button")
      .eq(0)
      .invoke("text")
      .should("match", /^Annuller/);
    cy.get(".container").find("button").eq(0).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Konsolider/);
  });
});
