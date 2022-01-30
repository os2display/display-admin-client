describe("Simple app loads", () => {
  it("Loads and simple test", () => {
    cy.visit("/slide/list?published=all&page=1&order=asc&sort=title");
    cy.get("tbody").find("tr").should("have.length", 10);
    cy.get("#root").should("not.be.empty");
  });
});
