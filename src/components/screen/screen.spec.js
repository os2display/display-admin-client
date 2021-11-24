describe("Screen list tests", () => {

  it("It loads screen list", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk/screen/list");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("exist");
  });

  it("It goes to edit (screen list)", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk/screen/list");
    cy.get("#screenTitle").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#screenTitle").should("exist");
  });
  it("It opens delete modal (screen list)", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk/screen/list");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (screen list)", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk/screen/list");
    cy.get("thead").find("th").should("have.length", 9);
  });

  it("It removes all selected", () => {
    cy.visit("http://display-admin-client.local.itkdev.dk/screen/list");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
