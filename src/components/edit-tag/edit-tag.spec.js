describe("Edit tag page loads", () => {

  it("It validates new tag", () => {
    cy.visit("/tag/new");
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Gem tag/);
    cy.get(".container").find("button").eq(1).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Gem tag/);
    cy.get("input").type("Hello, World");
    cy.get(".container").find("button").eq(1).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Konsolider/);
  });

  it("It validates already existing tag", () => {
    cy.visit("/tag/32");
    cy.get("#tag_name").clear();
    cy.get(".container")
      .find("#save_tag")
      .invoke("text")
      .should("match", /^Gem tag/);
    cy.get("#save_tag").click();
    cy.get(".container")
      .find("#save_tag")
      .invoke("text")
      .should("match", /^Gem tag/);
    cy.get("#tag_name").type("Hello, World");
    cy.get("#save_tag").click();
    cy.get("#save_tag").should("not.exist");
  });

  it("It loads", () => {
    cy.visit("/tag/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret nyt tag/);
    cy.visit("/tag/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger følgende tag: matrices/);
  });
});
