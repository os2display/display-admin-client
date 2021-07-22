describe("Edit location page loads", () => {
  it("It loads", () => {
    cy.visit("/location/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny lokation/);
    cy.visit("/location/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger lokationen: Dokk1/);
  });


  it("It removes from list", () => {
    cy.visit("/location/32");
    cy.get("tbody").find("tr td").should("have.length", 5);
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("tbody").should("not.exist");

  });
  it("It goes back", () => {
    cy.visit("/locations");
    cy.visit("/location/new");
    cy.get(".container")
      .find("button")
      .eq(0)
      .invoke("text")
      .should("match", /^Annuller/);
    cy.get("input").type("Hello, World");
    cy.get("#save_location").click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Konsolider/);
  });
});
