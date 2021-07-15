describe("Table body loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/");
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 60);
  });

  it("If checked, the buttons are disabled", () => {
    cy.visit("localhost:3000/");
    cy.get("tbody")
      .find("tr")
      .eq(0)
      .find("button")
      .first()
      .should("have.length", 1);
    cy.get("tbody")
      .find("tr")
      .eq(0)
      .find("button")
      .first()
      .should("be.not.disabled");
    cy.get("tbody")
      .find("tr")
      .eq(0)
      .find("button")
      .last()
      .should("have.length", 1);
    cy.get("tbody")
      .find("tr")
      .eq(0)
      .find("button")
      .last()
      .should("be.not.disabled");
    cy.get('[type="checkbox"]').check();
    cy.get("tbody")
      .find("tr")
      .eq(0)
      .find("button")
      .first()
      .should("be.disabled");
    cy.get("tbody")
      .find("tr")
      .eq(0)
      .find("button")
      .last()
      .should("be.disabled");
  });
});
