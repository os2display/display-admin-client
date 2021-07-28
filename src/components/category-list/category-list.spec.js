describe("Categories list tests", () => {
  it("It loads categories list", () => {
    cy.visit("/categories");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 60);
  });
  it("It opens info modal (categories list)", () => {
    cy.visit("/categories");
    cy.get("#info-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("#info-modal").should("exist");
  });

  it("It goes to edit (categories list)", () => {
    cy.visit("/categories");
    cy.get("#categoryName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#categoryName").should("exist");
  });
  it("It opens delete modal (categories list)", () => {
    cy.visit("/categories");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#delete-modal").should("exist");
  });
  it("The column headers are correct (categories list)", () => {
    cy.visit("/categories");
    cy.get("thead").find("th").eq(0).invoke("text").should("match", /^Valg/);
    cy.get("thead").find("th").eq(1).invoke("text").should("match", /^Navn/);
    cy.get("thead")
      .find("th")
      .eq(2)
      .invoke("text")
      .should("match", /^Oprettet af/);
    cy.get("thead")
      .find("th")
      .eq(3)
      .invoke("text")
      .should("match", /^# spillelister/);
  });
});
