describe("Sidebar loads", () => {
  it("It loads", () => {
    cy.visit("/slides");
    cy.get("#sidebar").should("exist");
  });
});
