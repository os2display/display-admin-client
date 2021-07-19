describe("Screen list loads", () => {
  it("It loads", () => {
    cy.visit("/screens");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 70);
  });

  it("The column headers are correct", () => {
    cy.visit("/screens");
    cy.get("thead").find("th").eq(0).invoke("text").should("match", /^Valg/);
    cy.get("thead").find("th").eq(1).invoke("text").should("match", /^Navn/);
    cy.get("thead")
      .find("th")
      .eq(2)
      .invoke("text")
      .should("match", /^Størrelse/);
    cy.get("thead")
      .find("th")
      .eq(3)
      .invoke("text")
      .should("match", /^Opløsning/);
    cy.get("thead")
      .find("th")
      .eq(4)
      .invoke("text")
      .should("match", /^Kampagne/);
  });
});
