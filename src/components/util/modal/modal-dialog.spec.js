describe("Modal loads", () => {
  it("It loads", () => {
    cy.visit("/");
    cy.get('[type="checkbox"]').check();
    cy.get("#delete-button").click();
    cy.get(".modal-container").should("have.css", "position", "absolute");
  });
});
