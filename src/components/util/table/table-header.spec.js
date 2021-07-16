describe("Table header loads", () => {
  it("It loads", () => {
    cy.visit("localhost:3000/");
    cy.get("table").find("thead").should("not.be.empty");
  });

  it("It sorts by name", () => {
    cy.visit("localhost:3000/");
    cy.get("#table-header-name").should("not.be.empty");
    cy.get("tbody").find("tr td").eq(1).should("have.length", 1);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^3rd generation/);
    cy.get("#table-header-name").click();
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^workforce/);
  });

  it("It sorts by created by", () => {
    cy.visit("localhost:3000/");
    cy.get("#table-header-createdBy").should("not.be.empty");
    cy.get("tbody").find("tr td").eq(2).should("have.length", 1);
    cy.get("tbody")
      .find("tr td")
      .eq(2)
      .invoke("text")
      .should("match", /^Brandi/);
    cy.get("#table-header-createdBy").click();
    cy.get("tbody")
      .find("tr td")
      .eq(2)
      .invoke("text")
      .should("match", /^Aleta/);
    cy.get("#table-header-createdBy").click();
    cy.get("tbody")
      .find("tr td")
      .eq(2)
      .invoke("text")
      .should("match", /^Zelda/);
  });

  it("It sorts by number of slides", () => {
    cy.visit("localhost:3000/");
    cy.get("#table-header-slides").should("not.be.empty");
    cy.get("tbody").find("tr td").eq(3).should("have.length", 1);
    cy.get("tbody").find("tr td").eq(3).invoke("text").should("match", /^76/);
    cy.get("#table-header-slides").click();
    cy.get("tbody").find("tr td").eq(3).invoke("text").should("match", /^1/);
    cy.get("#table-header-slides").click();
    cy.get("tbody").find("tr td").eq(3).invoke("text").should("match", /^93/);
  });

  it("It sorts by number of playlists", () => {
    cy.visit("localhost:3000/categories");
    cy.get("#table-header-onFollowingPlaylists").should("not.be.empty");
    cy.get("tbody").find("tr td").eq(3).should("have.length", 1);
    cy.get("tbody").find("tr td").eq(3).invoke("text").should("match", /^5/);
    cy.get("#table-header-onFollowingPlaylists").click();
    cy.get("tbody").find("tr td").eq(3).invoke("text").should("match", /^0/);
    cy.get("#table-header-onFollowingPlaylists").click();
    cy.get("tbody").find("tr td").eq(3).invoke("text").should("match", /^7/);
  });
  it("Loads parametres from url", () => {
    cy.visit("localhost:3000/tags?sort=createdBy&order=asc&page=1");
    cy.get("#table-header-slides").should("not.be.empty");
    cy.get("tbody").find("tr td").eq(3).should("have.length", 1);
    cy.get("tbody")
      .find("tr td")
      .eq(2)
      .invoke("text")
      .should("match", /^Aleta/);
    cy.get("tbody").find("tr td").eq(3).invoke("text").should("match", /^10/);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^coherent/);

    cy.visit("localhost:3000/tags?sort=name&order=desc&page=1");
    cy.get("#table-header-slides").should("not.be.empty");
    cy.get("tbody").find("tr td").eq(3).should("have.length", 1);
    cy.get("tbody").find("tr td").eq(2).invoke("text").should("match", /^Bee/);
    cy.get("tbody").find("tr td").eq(3).invoke("text").should("match", /^90/);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^workforce/);
  });
});
