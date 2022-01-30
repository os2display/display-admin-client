describe("Table body loads", () => {
  it("It loads", () => {
    cy.visit("/slide/list");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 70);
  });
});
