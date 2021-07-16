describe("Tags list loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/slides");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 80);
  });

  it("The column headers are correct", () => {
    cy.visit("localhost:3000/slides");
    cy.get("thead").find("th").eq(0).invoke("text").should("match", /^Valg/);
    cy.get("thead").find("th").eq(1).invoke("text").should("match", /^Navn/);
    cy.get("thead")
      .find("th")
      .eq(2)
      .invoke("text")
      .should("match", /^Skabelon/);
    cy.get("thead")
      .find("th")
      .eq(3)
      .invoke("text")
      .should("match", /^# spillelister/);
    cy.get("thead")
      .find("th")
      .eq(4)
      .invoke("text")
      .should("match", /^Tags/);
    cy.get("thead")
      .find("th")
      .eq(5)
      .invoke("text")
      .should("match", /^Udgivet/);
  });
});
