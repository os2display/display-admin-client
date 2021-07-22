describe("Groups list loads", () => {
  it("It loads", () => {
    cy.visit("/groups");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 20);
  });

  it("The column headers are correct", () => {
    cy.visit("/groups");
    cy.get("thead").find("th").eq(0).invoke("text").should("match", /^Valg/);
    cy.get("thead").find("th").eq(1).invoke("text").should("match", /^Navn/);
    cy.get("thead")
      .find("th")
      .eq(2)
      .invoke("text")
      .should("match", /^Oprettet af/);
  });
});
