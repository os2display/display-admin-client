describe("Pagination loads", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/themes*", { fixture: "themes.json" }).as(
      "themesData"
    );
    cy.visit("/themes/list?page=1&order=asc&sort=title");
    cy.wait(["@themesData"]);
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
          fixture: "themes-second-page.json",
        }).as("themesData");

        cy.get(".pagination").find(".page-link").eq(9).click();
        cy.wait(["@themesData"]);
        cy.get("tbody").find("tr").should("have.length", 10);
        cy.get("tbody")
          .find("tr td")
          .eq(1)
          .should("not.have.text", titleCellText);
      });
  });

  it("It works on themes with url input", () => {
    cy.intercept("GET", "**/themes*", { fixture: "themes.json" }).as(
      "themesData"
    );
    cy.visit("/themes/list?page=6&order=asc&sort=title");
    cy.wait(["@themesData"]);

    cy.get(".pagination")
      .find(".page-item")
      .eq(5)
      .should("have.class", "active");
  });
});
