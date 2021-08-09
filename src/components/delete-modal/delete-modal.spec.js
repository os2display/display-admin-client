describe("Delete modal loads", () => {
  it("It loads", () => {
    cy.visit("/categories");
    cy.get("tbody").find("tr td button").eq(2).should("not.be.disabled");
    cy.get("tbody").find("tr td button").eq(2).click();
    cy.get(".modal-container")
      .find("button")
      .first()
      .invoke("text")
      .should("match", /^Nej/);
    cy.get(".modal-container")
      .find("button")
      .last()
      .invoke("text")
      .should("match", /^Ja/);
  });
});
