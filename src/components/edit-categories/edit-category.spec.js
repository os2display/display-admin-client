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

});
