describe("Edit tag page loads", () => {
  it("It loads", () => {
    cy.visit("/tag/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret nyt tag/);
    cy.visit("/tag/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger følgende tag: matrices/);
  });

  it("It validates", () => {
    cy.visit("/tag/new");
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Gem tag/);
    cy.get(".container").find("button").eq(1).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Gem tag/);

    cy.get("input").type("Hello, World");
    cy.get(".container").find("button").eq(1).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Konsolider/);
  });

  it("It goes back", () => {
    cy.visit("/");
    cy.visit("/tag/new");
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
