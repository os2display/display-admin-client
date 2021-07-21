describe("Delete modal loads", () => {
  it("It loads", () => {
    cy.visit("/categories");
    cy.get("tbody").find("tr td button").eq(1).should("not.be.disabled");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#info-modal")
      .invoke("text")
      .should(
        "match",
        /^ObsKategorien er på de følgende spillelister: {2}dynamic, Mandatory, Enhanced, explicit og policyLuk dialog/
      );
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
