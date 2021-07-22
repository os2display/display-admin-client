describe("Edit category page loads", () => {
  it("It loads", () => {
    cy.visit("/category/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny kategori/);
    cy.visit("/category/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger kategorien: Lotstring/);
  });

  it("It goes back", () => {
    cy.visit("/categories");
    cy.visit("/category/new");
    cy.get(".container")
      .find("button")
      .eq(0)
      .invoke("text")
      .should("match", /^Annuller/);
    cy.get("input").type("Hello, World");
    cy.get("#save_category").click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Konsolider/);
  });
});
