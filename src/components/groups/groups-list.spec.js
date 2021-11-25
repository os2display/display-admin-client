describe("Groups list tests", () => {


  beforeEach(() => {

    cy.intercept({
      method: "GET",
      url: "**/screen-groups*",
      query: {
        page: "1",
      },
    }).as("screenGroupsData");
    cy.visit("/group/list");
    cy.wait(["@screenGroupsData"]);
  })
  it("It loads groups list", () => {
    cy.get("table").find("tbody").should("not.be.empty");
    cy.get("tbody").find("tr td").should("exist");
  });

  it("It goes to edit (groups list)", () => {
    cy.get("#groupTitle").should("not.exist");
    cy.get("tbody").find("tr td a").eq(0).click();
    cy.get("#groupTitle").should("exist");
  });
  it("It opens delete modal (groups list)", () => {
    cy.get("#delete-modal").should("not.exist");
    cy.get("tbody").find("tr td button").eq(1).click();
    cy.get("#delete-modal").should("exist");
  });

  it("The correct amount of column headers loaded (groups list)", () => {
    cy.get("thead").find("th").should("have.length", 5);
  });

  it("It removes all selected", () => {
    cy.get("tbody").find("tr td button").eq(0).click();
    cy.get("tbody").find("tr").eq(0).should("have.class", "bg-light");
    cy.get("#clear-rows-button").click();
    cy.get("tbody").find("tr").eq(0).should("have.not.class", "bg-light");
  });
});
