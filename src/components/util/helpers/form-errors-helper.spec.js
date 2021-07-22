describe("Form validations", () => {
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

  it("It validates new category", () => {
    cy.visit("/category/new");
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Gem kategorien/);
    cy.get(".container").find("button").eq(1).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Gem kategorien/);
    cy.get("input").type("Hello, World");
    cy.get(".container").find("button").eq(1).click();
    cy.get(".container")
      .find("button")
      .eq(1)
      .invoke("text")
      .should("match", /^Konsolider/);
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
    cy.get(".dropdown-heading").eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(0).check();
    cy.get(".dropdown-heading").eq(1).click({ force: true });
    cy.get('[type="checkbox"]').eq(0).check();
    cy.get("#screen_layout").select("Footer", { force: true });
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

  it("It validates already existing category", () => {
    cy.visit("/category/32");
    cy.get("#category_name").clear();
    cy.get(".container")
      .find("#save_category")
      .invoke("text")
      .should("match", /^Gem kategori/);
    cy.get("#save_category").click();
    cy.get(".container")
      .find("#save_category")
      .invoke("text")
      .should("match", /^Gem kategori/);
    cy.get("#category_name").type("Hello, World");
    cy.get("#save_category").click();
    cy.get("#save_category").should("not.exist");
  });
});
