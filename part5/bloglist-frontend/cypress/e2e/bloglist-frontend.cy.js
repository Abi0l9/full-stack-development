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

  describe("when logged in", () => {
    beforeEach(() => {
      cy.contains("Login").click();
      cy.get("#username").type("kash");
      cy.get("#password").type("root");
      cy.get("#login-button").click();

      cy.contains("logged in");
    });

    it("can add new blog", () => {
      cy.contains("Add blog").click();

      const title = "Latest Blog";
      const author = "New Author";

      cy.get("#title").type(title);
      cy.get("#author").type(author);
      cy.get("#url").type("New Url");
      cy.get("#likes").type("30000");

      cy.get("#create").click();
      // cy.contains(`A new blog ${title} by ${author} has been added `);
      // cy.contains(title);
    });
  });
});
