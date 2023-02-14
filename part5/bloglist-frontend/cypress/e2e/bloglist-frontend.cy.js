describe("BlogList", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("frontpage can be opened", () => {
    cy.contains("Login into the application");
  });

  it("user can login", () => {
    cy.contains("Login").click();
    cy.get("#username").type("kash");
    cy.get("#password").type("root");
    cy.get("#login-button").click();

    cy.contains("logged in");
  });
});
