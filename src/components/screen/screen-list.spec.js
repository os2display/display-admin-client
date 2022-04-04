describe("Screen list loads", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/screen-groups*", {
      fixture: "screens/groups.json",
    }).as("groups");
    cy.intercept("GET", "**/screens*", {
      fixture: "screens/screens.json",
    }).as("screens");
    cy.visit("/screen/list");
    cy.get("#login").click();
    cy.wait(["@screens", "@screens", "@groups", "@groups", "@token"]);
  });

  it("It loads screens list", () => {
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("have.length", 70);
  });

  it("It goes to edit (screens list)", () => {
    // Mock successful response on get
    cy.intercept("GET", "**/screens/*", {
      fixture: "screens/screen-successful.json",
    });
    cy.get("#screenTitle").should("not.exist");
    cy.get("tbody").find("#edit_button").eq(0).click();
    cy.get("#screenTitle").should("exist");
  });

  it("It opens delete modal (screens list)", () => {
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(2).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (screens list)", () => {
    cy.get("thead").find("th").should("have.length", 7);
  });

  it("It removes all selected", () => {
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
