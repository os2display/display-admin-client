describe("Info modal loads", () => {
  it("It loads", () => {
    cy.visit("/categories");
    cy.get("tbody").find("tr td button").eq(1).should("not.be.disabled");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#info-modal")
      .invoke("text")
      .should(
        "match",
        /^ObsSpillelisten har følgende kategorier: dynamic, Mandatory, Enhanced, explicit og policyLuk dialog/
      );
  });
});
