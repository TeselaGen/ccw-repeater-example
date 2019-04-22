describe("addtodo", function() {
  it(`should add a todo`, () => {
    const url = Cypress.env("TEST_URL") || "http://localhost:3000";

    cy.visit(url);

    cy.get("input")
      .first()
      .type("first test");
    cy.get("textarea")
      .last()
      .type("Description of first test");
    cy.contains("button", "Add Todo").click();
    cy.contains("first test: Description of first test").should("be.visible");
  });
});
