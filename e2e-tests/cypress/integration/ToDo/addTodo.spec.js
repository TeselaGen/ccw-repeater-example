describe("addtodo", function() {
  it(`should add a todo`, () => {
    cy.visit("http://localhost:3000");

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
