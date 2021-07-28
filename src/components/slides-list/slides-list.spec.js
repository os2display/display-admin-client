describe("Slides list tests", () => {
  it("It loads slides list", () => {
    cy.visit("/slides");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 80);
  });

  it("It goes to edit (slides list)", () => {
    cy.visit("/slides");
    cy.get("#slideName").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#slideName").should("exist");
  });
  it("It opens delete modal (slides list)", () => {
    cy.visit("/slides");
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The column headers are correct (slides list)", () => {
    cy.visit("/slides");
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
    cy.get("thead").find("th").eq(4).invoke("text").should("match", /^Tags/);
    cy.get("thead")
      .find("th")
      .eq(5)
      .invoke("text")
      .should("match", /^Udgivet/);
  });
});
