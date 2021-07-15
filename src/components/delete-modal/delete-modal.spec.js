describe("Delete modal loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/");
    cy.get("#delete-button").should("be.disabled");
    cy.get('[type="checkbox"]').check();
    cy.get("#delete-button").should("not.be.disabled");
    cy.get("#delete-button").invoke("text").should("match", /^Slet/);
    cy.get("#delete-button").click();
    cy.get(".modal-container").should("have.css", "position", "absolute");
    cy.get(".modal-container").find("button").should("have.length", 2);
    cy.get(".modal-container")
      .find("button")
      .first()
      .invoke("text")
      .should("match", /^Nono, no deleting/);
    cy.get(".modal-container")
      .find("button")
      .last()
      .invoke("text")
      .should("match", /^Yes, delete/);
  });
});
