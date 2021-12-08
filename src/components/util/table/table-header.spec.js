describe("Table header loads", () => {
  it("It loads", () => {
    cy.visit("/slide/list");
    cy.get("table").find("thead").should("not.be.empty");
  });

  it("It sorts by title", () => {
    cy.intercept({
      method: "GET",
      url: "**/templates/00XZXR5XDH0D1M16K10NYQ0A55",
    }).as("templatesData");
    cy.intercept({
      method: "GET",
      url: "**/slides*",
      query: {
        page: "1",
      },
    }).as("slidesData");
    cy.visit("/slide/list");
    cy.wait(["@slidesData", "@templatesData"]);
    cy.get("#table-header-title").should("not.be.empty");
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^Adipisci quaerat voluptatum sed./);
    cy.get("#table-header-title").click();

    cy.intercept({
      method: "GET",
      url: "**/slides*",
      query: {
        page: "1"
      },
    }).as("slidesData");
    cy.intercept({
      method: "GET",
      url: "**/templates/00EZZGVW6P0KSH0PV90G6Y0HFY",
    }).as("templatesData");
    cy.wait(["@slidesData", "@templatesData"]);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^Voluptatem amet non./);
  });

  it("Loads parametres sort url", () => {
    cy.intercept({
      method: "GET",
      url: "**/slides*",
      query: {
        page: "1",
      },
    }).as("slidesData");
    cy.intercept({
      method: "GET",
      url: "**/templates/00EZZGVW6P0KSH0PV90G6Y0HFY",
    }).as("templatesData");
    cy.visit("/slide/list?published=all&page=1&order=desc&sort=title");
    cy.wait(["@slidesData", "@templatesData"]);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^Voluptatem amet non./);
  });

  it("Loads parametres search url", () => {
    cy.intercept({
      method: "GET",
      url: "**/slides*",
      query: {
        page: "1"
      },
    }).as("slidesData");
    cy.intercept({
      method: "GET",
      url: "**/templates/00MWCNKC4P0X5C0AT70E741E2V",
    }).as("templatesData");
    cy.visit("/slide/list?published=all&page=1&order=asc&sort=title&search=harum");
    cy.wait(["@slidesData", "@templatesData"]);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^Harum cumque aperiam voluptatem necessitatibus./);
    cy.get("tbody").find("tr td").should("have.length", 14);
  });

  it("Loads parametres published url", () => {
    cy.intercept({
      method: "GET",
      url: "**/slides*",
      query: {
        page: "1",
      },
    }).as("slidesData");
      cy.intercept({
      method: "GET",
      url: "**/templates/000BGWFMBS15N807E60HP91JCX",
    }).as("templatesData");
    cy.visit("/slide/list?page=1&order=asc&sort=title&published=not-published");
    cy.wait(["@slidesData", "@templatesData"]);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^Adipisci vero quia./);
    cy.get(".pagination").find(".page-item").should("have.length", 5);
  });
});
