describe("Playlist pages work", () => {
  it("It loads create playlist page", () => {
    cy.visit("/playlist/create");
    cy.get("#save_playlist").should("exist");
  });

  it("It drags and drops slide", () => {
    cy.visit("/playlist/create");
    cy.get(".dropdown-container").eq(0).type("{enter}");
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get('[type="checkbox"]').eq(0).check();
    cy.get(".dropdown-container").eq(0).click();
    cy.get(".dropdown-heading-value").contains(
      "Aperiam maxime autem. og Odio quidem ab dolores dolores."
    );
    cy.get("tbody").find("tr td").should("have.length", 12);
    cy.get("tbody")
      .find("tr td")
      .contains("Aperiam maxime autem");
    cy.get("tbody")
      .find("tr td")
      .eq(7)
      .contains("Odio quidem ab dolores dolores.");
    cy.get("tbody").find("tr").eq(0).type(" {downarrow} ", { force: true });
    cy.get("tbody")
      .find("tr td")
      .contains("Odio quidem ab dolores dolores.");
    cy.get("tbody")
      .find("tr td")
      .eq(7)
      .contains("Aperiam maxime autem.");
  });

  it("It removes slide", () => {
    cy.visit("/playlist/create");
    cy.get("#slides-section").find(".dropdown-container").eq(0).type("{enter}");
    cy.get("#slides-section").find('[type="checkbox"]').eq(1).check();
    cy.get("#slides-section").find(".dropdown-container").eq(0).click();
    cy.get("#slides-section").find("tbody").find("tr td").should("have.length", 6);
    cy.get("#slides-section").find("tbody").find("tr td button").eq(1).click();
    cy.get("#slides-section").find("tbody").should("not.exist");
  });

  it("It redirects on save", () => {
    cy.visit("/playlist/create");
    cy.get("#save_playlist").click();
    cy.url().should("include", "playlist/edit/");
  });

  it("It cancels create playlist", () => {
    cy.visit("/playlist/create");
    cy.get("#cancel_playlist").should("exist");
    cy.get("#cancel_playlist").click();
    cy.get("#cancel_playlist").should("not.exist");
  });
});
