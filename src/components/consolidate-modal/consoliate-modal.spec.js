describe("Consolidate modal loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/");
    cy.get("#consolidate-button").should("be.disabled");
    cy.get('[type="checkbox"]').check();
    cy.get("#consolidate-button").should("not.be.disabled");
    cy.get("#consolidate-button")
      .invoke("text")
      .should("match", /^Konsolider/);
    cy.get("#consolidate-button").click();
    cy.get(".modal-container").should("have.css", "position", "absolute");
    cy.get(".modal-container").find("button").should("have.length", 2);
    cy.get(".modal-container")
      .find("button")
      .first()
      .invoke("text")
      .should("match", /^Nono, no consolidating today/);
    cy.get(".modal-container")
      .find("button")
      .last()
      .invoke("text")
      .should("match", /^Yes, consolidate/);
  });
});
