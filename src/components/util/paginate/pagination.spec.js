describe("Pagination loads", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/themes*", {
      fixture: "themes/themes-first-page.json",
    }).as("themesData");
    cy.visit("/admin/themes/list");
    cy.get("#login").click();
    cy.wait(["@themesData", "@token"]);
  });

  it("It loads", () => {
    cy.get(".pagination").should("not.be.empty");
  });

  it("It works on themes", () => {
    cy.get(".pagination")
      .find("button")
      .first()
      .invoke("text")
      .should("match", /^1/);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .then((titleCellText) => {
        cy.get("tbody").find("tr").should("have.length", 10);

        cy.intercept("GET", "**/themes*", {
          fixture: "themes/themes-second-page.json",
        }).as("themesData");
        cy.get(".pagination").find(".page-link").eq(1).click();
        cy.wait(["@themesData"]);
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(300);
        cy.get("tbody").find("tr").should("have.length", 10);
        cy.get("tbody")
          .find("tr td")
          .eq(1)
          .should("not.have.text", titleCellText);
      });
  });

  it("It works on themes with url input", () => {
    cy.intercept("GET", "**/themes*", {
      fixture: "themes/themes-second-page.json",
    }).as("themesData");
    cy.visit("/admin/themes/list?page=2&order=asc&sort=title");
    cy.wait(["@themesData"]);

    cy.get(".pagination")
      .find(".page-item")
      .eq(1)
      .should("have.class", "active");
  });
});
