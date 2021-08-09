describe("User list tests", () => {
  it("It loads user list", () => {
    cy.visit("/users");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 60);
  });

  it("It goes to edit (user list)", () => {
    cy.visit("/users");
    cy.get("#userName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#userName").should("exist");
  });
  it("It opens delete modal (user list)", () => {
    cy.visit("/users");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (user list)", () => {
    cy.visit("/users");
    cy.get("thead").find("th").should("have.length", 6);
  });
});
