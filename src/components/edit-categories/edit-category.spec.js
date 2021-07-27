describe("Edit category page tests", () => {
  it("It loads a category", () => {
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

  it("It validates new category", () => {
    cy.visit("/category/new");
    cy.get("#save_category")
      .invoke("text")
      .should("match", /^Gem kategorien/);
    cy.get("#save_category").click();
    cy.get("#save_category")
      .invoke("text")
      .should("match", /^Gem kategorien/);
    cy.get("input").type("Hello, World");
    cy.get("#save_category").click();
    cy.get("#save_category").should("not.exist");
  });

  it("It validates already existing category", () => {
    cy.visit("/category/32");
    cy.get("#categoryName").clear();
    cy.get("#save_category")
      .invoke("text")
      .should("match", /^Gem kategori/);
    cy.get("#save_category").click();
    cy.get("#save_category")
      .invoke("text")
      .should("match", /^Gem kategori/);
    cy.get("#categoryName").type("Hello, World");
    cy.get("#save_category").click();
    cy.get("#save_category").should("not.exist");
  });
});
