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
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").should("not.exist");
  });

  it("It validates new location", () => {
    cy.visit("/location/new");
    cy.get("#save_location")
      .invoke("text")
      .should("match", /^Gem lokation/);
    cy.get("#save_location").click();
    cy.get("#save_location")
      .invoke("text")
      .should("match", /^Gem lokation/);
    cy.get("#locationName").type("x");
    cy.get(".dropdown-heading").eq(0).click();
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get(".dropdown-heading").eq(0).click();
    cy.get("#save_location").click();
    cy.get("#save_location").should("not.exist");
  });

  it("It validates already existing location", () => {
    cy.visit("/location/32");
    cy.get("#locationName").clear();
    cy.get("#save_location")
      .invoke("text")
      .should("match", /^Gem lokation/);
    cy.get("#save_location").click();
    cy.get("#save_location")
      .invoke("text")
      .should("match", /^Gem lokation/);
    cy.get("#locationName").type("x");
    cy.get("#save_location").click();
    cy.get("#save_location").should("not.exist");
  });

  it("It cancels already existing location", () => {
    cy.visit("/locations/");
    cy.visit("/location/32");
    cy.get("#location_cancel").click();
    cy.get("#location_cancel").should("not.exist");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Lokationer/);
  });
  it("It cancels new location", () => {
    cy.visit("/locations/");
    cy.visit("/location/new");
    cy.get("#location_cancel").click();
    cy.get("#location_cancel").should("not.exist");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Lokationer/);
  });
});
