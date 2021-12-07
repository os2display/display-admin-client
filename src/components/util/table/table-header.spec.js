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
        sort: "title",
        order: "desc",
      },
    }).as("slidesData");
    cy.wait(["@slidesData"]);
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
    cy.visit("/slide/list?published=all&page=1&order=desc&sort=title");
    cy.wait(["@slidesData"]);
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
        page: "1",
      },
    }).as("slidesData");
    cy.visit("/slide/list?published=all&page=1&order=asc&sort=title&search=harum");
    cy.wait(["@slidesData"]);
    // sort
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
    cy.visit("/slide/list?page=1&order=asc&sort=title&published=not-published");
    cy.wait(["@slidesData"]);
    cy.get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .should("match", /^Adipisci vero quia./);
    cy.get(".pagination").find(".page-item").should("have.length", 5);
  });
});
