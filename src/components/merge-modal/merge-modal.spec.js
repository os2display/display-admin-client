describe("Merge modal loads", () => {
  it("It loads", () => {
    cy.visit("/tags");
    cy.get("#merge-button").should("be.disabled");
    cy.get('[type="checkbox"]').check();
    cy.get("#merge-button").should("not.be.disabled");
    cy.get("#merge-button")
      .invoke("text")
      .should("match", /^Konsolider/);
    cy.get("#merge-button").click();
    cy.get("#merge-modal").should("have.css", "position", "absolute");
    cy.get("#merge-modal").find("button").should("have.length", 2);
    cy.get("#merge-modal")
      .find("button")
      .first()
      .invoke("text")
      .should("match", /^Nej/);
    cy.get("#merge-modal")
      .find("button")
      .last()
      .invoke("text")
      .should("match", /^Ja/);
  });
});
