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

  it("It validates new screen", () => {
    cy.visit("/screen/new");
    cy.get("#save_screen")
      .invoke("text")
      .should("match", /^Gem skærm/);
    cy.get("#save_screen").click();
    cy.get("#save_screen")
      .invoke("text")
      .should("match", /^Gem skærm/);
    cy.get("#screen_name").type("Hello, World");
    cy.get("#save_screen").click();
    cy.get("#save_screen")
      .invoke("text")
      .should("match", /^Gem skærm/);
    cy.get(".dropdown-heading").eq(0).click();
    cy.get('[type="checkbox"]').eq(0).check();
    cy.get(".dropdown-heading").eq(0).click();
    cy.get(".dropdown-heading").eq(1).click();
    cy.get('[type="checkbox"]').eq(0).check();
    cy.get(".dropdown-heading").eq(1).click();
    cy.get("#screen_layout").select("Footer");
    cy.get("#save_screen").click();
    cy.get("#save_screen").should("not.exist");
  });

  it("It validates already existing screen", () => {
    cy.visit("/screen/32");
    cy.get("#screen_name").clear();
    cy.get(".container")
      .find("#save_screen")
      .invoke("text")
      .should("match", /^Gem skærm/);
    cy.get("#save_screen").click();
    cy.get(".container")
      .find("#save_screen")
      .invoke("text")
      .should("match", /^Gem skærm/);
    cy.get("#screen_name").type("Hello, World");
    cy.get("#save_screen").click();
    cy.get("#save_screen").should("not.exist");
  });
});
