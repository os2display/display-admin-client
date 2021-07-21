describe("Edit screen page loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/screen/new");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Opret ny skærm/);
    cy.visit("localhost:3000/screen/76");
    cy.get("h1").should("not.be.empty");
    cy.get("h1")
      .invoke("text")
      .should("match", /^Rediger denne skærm: Asoka/);
  });

  it("It validates", () => {
    cy.visit("localhost:3000/screen/32");
    cy.get("#name").clear();
    cy.get(".container")
      .find("#save_screen")
      .invoke("text")
      .should("match", /^Gem skærm/);
    cy.get("#save_screen").click();
    cy.get(".container")
      .find("#save_screen")
      .invoke("text")
      .should("match", /^Gem skærm/);
    cy.get("#name").type("Hello, World");
    cy.get("#save_screen").click();
    cy.get("#save_screen").should('not.exist')
  });

  it("It loads drag and drop table", () => {
    cy.visit("localhost:3000/screen/32");
    cy.get("tbody").find("tr td").should("have.length", 4);
  });

  it("It loads delete modal", () => {
    cy.visit("localhost:3000/screen/32");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get(".modal-container").should("have.css", "position", "absolute");
    cy.get(".modal-container").find("button").should("have.length", 2);
    cy.get(".modal-container")
      .find("button")
      .first()
      .invoke("text")
      .should("match", /^Nej/);
    cy.get(".modal-container")
      .find("button")
      .last()
      .invoke("text")
      .should("match", /^Ja/);
  });

  it("It goes back", () => {
    cy.visit("localhost:3000/");
    cy.visit("localhost:3000/screen/new");
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
