describe("Table header loads", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/themes*", { fixture: "themes.json" }).as(
      "themesData"
    );
    cy.visit("/themes/list");
    cy.wait(["@themesData", "@themesData"]);
    cy.wait(1000);
  });

  it("It loads", () => {
    cy.visit("/themes/list");
    cy.get("table").find("thead").should("not.be.empty");
  });

  it("It sorts by title", () => {
    cy.intercept({
      method: "GET",
      url: "**/themes*",
      query: {
        page: "1",
        order: "desc",
      },
    }).as("secondQuery");
    cy.get("#table-header-title").click();
    cy.wait("@secondQuery").then((interception) => {
      assert.isNotNull(interception.response.body, "The api is called again");
    });
  });

  it("Loads parametres sort url", () => {
    cy.intercept({
      method: "GET",
      url: "**/themes*",
      query: {
        page: "1",
        order: "desc",
        sort: "title",
      },
    }).as("themesData");
    cy.visit("/themes/list?page=1&order=desc&sort=title");
    cy.wait("@themesData").then((interception) => {
      assert.isNotNull(interception.response.body, "The api is called");
    });
  });

  it("Loads parametres search url", () => {
    cy.visit("/themes/list?page=1&order=asc&sort=title&search=harum");
    cy.get("#search-field")
      .invoke("val")
      .should("match", /^harum/);
  });

  it("Loads parametres published url", () => {
    cy.intercept({
      method: "GET",
      url: "**/slides*",
      query: {
        page: "1",
        published: "false",
      },
    }).as("slidesData");
    cy.visit("/slide/list?page=1&order=asc&sort=title&published=not-published");
    cy.wait("@slidesData").then((interception) => {
      assert.isNotNull(interception.response.body, "Not all published");
    });
  });
});
