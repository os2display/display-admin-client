describe("Edit tag page loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/category/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny kategori/);
    cy.visit("localhost:3000/category/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger kategorien: Lotstring/);
  });

  it("It validates", () => {
    cy.visit("localhost:3000/category/new");
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Gem kategorien/);
    cy.get(".container").find("button").eq(1).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Gem kategorien/);

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
    cy.visit("localhost:3000/category/new");
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
