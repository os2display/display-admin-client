describe("Playlist pages work", () => {
  it("It loads create playlist page", () => {
    cy.visit("/playlist/create");
    cy.get("#save_playlist").should("exist");
  });

  it("It loads create playlist page", () => {
    cy.visit("/playlist/edit/00HHKRWEGN0BAG08840TJK1HB0");
    cy.get("h1").contains(
      "Rediger følgende spilleliste: Alias voluptate quisquam voluptas."
    );
    cy.get("#save_playlist").should("exist");
  });

  it("It drags and drops slide", () => {
    cy.visit("/playlist/create");
    cy.get(".dropdown-container").eq(0).type("{enter}");
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get('[type="checkbox"]').eq(0).check();
    cy.get(".dropdown-container").eq(0).click();
    cy.get(".dropdown-heading-value").contains(
      "Blanditiis voluptas ex voluptas officia voluptatem."
    );
    cy.get("tbody").find("tr td").should("have.length", 12);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .contains("Blanditiis voluptas ex voluptas officia voluptatem.");
    cy.get("tbody")
      .find("tr td")
      .eq(7)
      .contains("Facilis et inventore excepturi.");
    cy.get("tbody").find("tr").eq(0).type(" {downarrow} ", { force: true });
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .contains("Facilis et inventore excepturi.");
    cy.get("tbody")
      .find("tr td")
      .eq(7)
      .contains("Blanditiis voluptas ex voluptas officia voluptatem.");
  });

  it("It removes slide", () => {
    cy.visit("/playlist/create");
    cy.get(".dropdown-container").eq(0).type("{enter}");
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get(".dropdown-container").eq(0).click();
    cy.get("tbody").find("tr td").should("have.length", 6);
    cy.get("tbody").find("tr td").eq(5).click();
    cy.get("tbody").should("not.exist");
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
