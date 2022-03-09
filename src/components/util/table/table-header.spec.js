describe("Table header loads", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/themes*", {
      fixture: "themes/themes-first-page.json",
    }).as("themesData");
    cy.visit("/themes/list");
    cy.get("#login").click();
    cy.wait(["@themesData", "@token"]);
  });

  it("It loads", () => {
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

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(300);
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
    cy.intercept("GET", "**/slides*", {
      fixture: "slides/slides.json",
    });
    cy.intercept({
      method: "GET",
      url: "**/slides*",
      query: {
        page: "1",
        published: "false",
      },
    }).as("slidesData");
    cy.visit("/slide/list");
    cy.visit("/slide/list?page=1&order=asc&sort=title&published=not-published");
    cy.wait("@slidesData").then((interception) => {
      assert.isNotNull(interception.response.body, "Not all published");
    });
  });
});
