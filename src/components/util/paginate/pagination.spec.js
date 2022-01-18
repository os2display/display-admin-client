describe("Pagination loads", () => {
  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "**/templates/*",
    }).as("templatesData");
    cy.visit("/slide/list?published=all&page=1&order=asc&sort=title");
    cy.wait([
      "@templatesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
    ]);
  });

  it("It loads", () => {
    cy.get(".pagination").should("not.be.empty");
  });

  it("It works on slides", () => {
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

        // Wait for data
        cy.intercept({
          method: "GET",
          url: "**/templates/*",
        }).as("templatesData");

        cy.get(".pagination").find(".page-link").eq(9).click();
        cy.wait([
          "@templatesData",
          "@templatesData",
          "@templatesData",
          "@templatesData",
          "@templatesData",
          "@templatesData",
          "@templatesData",
          "@templatesData",
        ]);
        cy.get("tbody").find("tr").should("have.length", 10);
        cy.get("tbody")
          .find("tr td")
          .eq(1)
          .should("not.have.text", titleCellText);
      });
  });

  it("It works on slides with url input", () => {
    cy.intercept({
      method: "GET",
      url: "**/slides*",
      query: {
        page: "6",
      },
    }).as("slidesData");
    // Wait for data
    cy.intercept({
      method: "GET",
      url: "**/templates/*",
    }).as("templatesData");
    cy.visit("/slide/list?published=all&page=6&order=asc&sort=title");
    cy.wait([
      "@slidesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
      "@templatesData",
    ]);
    cy.get(".pagination")
      .find(".page-item")
      .eq(5)
      .should("have.class", "active");
    cy.get("tbody").find("tr").should("have.length", 10);
  });
});
