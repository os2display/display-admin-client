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


  it("It validates new category", () => {
    cy.visit("/category/new");
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

  it("It validates already existing category", () => {
    cy.visit("/category/32");
    cy.get("#category_name").clear();
    cy.get(".container")
      .find("#save_category")
      .invoke("text")
      .should("match", /^Gem kategori/);
    cy.get("#save_category").click();
    cy.get(".container")
      .find("#save_category")
      .invoke("text")
      .should("match", /^Gem kategori/);
    cy.get("#category_name").type("Hello, World");
    cy.get("#save_category").click();
    cy.get("#save_category").should("not.exist");
  });
});
