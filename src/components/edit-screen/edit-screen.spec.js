describe("Edit screen page loads", () => {
  it("It loads", () => {
    cy.visit("/screen/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny skærm/);
    cy.visit("/screen/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger denne skærm: Asoka/);
  });

  it("It loads drag and drop table", () => {
    cy.visit("/screen/32");
    cy.get("tbody").find("tr td").should("have.length", 3);
  });

  it("It removes from list", () => {
    cy.visit("/screen/32");
    cy.get("tbody").find("tr td").should("have.length", 3);
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("tbody").should("not.exist");
  });

  it("It goes back", () => {
    cy.visit("/");
    cy.visit("/screen/new");
    cy.get(".container")
      .find("button")
      .eq(0)
      .invoke("text")
      .should("match", /^Annuller/);
    cy.get(".container").find("button").eq(0).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Konsolider/);
  });
});
