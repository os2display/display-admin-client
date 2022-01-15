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
      .contains("Adipisci quaerat voluptatum sed.");
    cy.get("tbody").find("tr").should("have.length", 10);
    cy.get(".pagination").find(".page-link").eq(9).click();

    // Wait for data
    cy.intercept({
      method: "GET",
      url: "**/templates/*",
    }).as("templatesData");
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
      .invoke("text")
      .should("match", /^Soluta in ea/);
  });

  it("It works on slides with url input", () => {
    cy.intercept({
      method: "GET",
      url: "**/slides*",
      query: {
        page: "6",
      },
    }).as("slidesData");
    cy.intercept({
      method: "GET",
      url: "**/templates/00HH42EEHC05QT14VQ041R1KEY",
    }).as("templatesData");
    cy.visit("/slide/list?published=all&page=6&order=asc&sort=title");
    cy.wait(["@slidesData", "@templatesData"]);
    cy.get(".pagination")
      .find(".page-item")
      .eq(5)
      .should("have.class", "active");
    cy.get("tbody").find("tr").should("have.length", 10);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^Molestiae hic autem cupiditate./);
  });
});
