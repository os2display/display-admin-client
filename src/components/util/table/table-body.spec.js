describe("Table body loads", () => {
  it("It loads", () => {
    cy.visit("/slide/list");
    cy.get("table", { timeout: 30000 }).find("tbody").should("not.be.empty");
    cy.get("tbody", { timeout: 30000 }).find("tr td").should("have.length", 70);
  });
});
