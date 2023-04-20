describe("BlogList", () => {
  beforeEach(function () {
    cy.visit("");
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Kash",
      username: "Kash",
      password: "root",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

    const user2 = {
      name: "Lola",
      username: "lola",
      password: "root",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);

    // cy.login({ username: "Kash", password: "root" });
  });

  it("frontpage can be opened", () => {
    cy.contains("Login into the application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Log in", () => {
    it("user can login", () => {
      cy.contains("Login").click();
      cy.get("#username").type("Kash");
      cy.get("#password").type("root");
      cy.get("#login-button").click();

      cy.contains("logged in");
    });

    it("login failed with wrong password", () => {
      cy.contains("Login").click();
      cy.get("#username").type("Kasssh");
      cy.get("#password").type("roooot");
      cy.get("#login-button").click();

      cy.get(".message")
        .should("contain", "Invalid Username/Password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border", "2px solid rgb(255, 0, 0)");
    });

    describe("When logged in", () => {
      beforeEach(() => {
        cy.login({ username: "Kash", password: "root" });

        cy.contains("Login").click();
        cy.get("#username").type("lola");
        cy.get("#password").type("root");
        cy.get("#login-button").click();
      });

      it("can add new blog", () => {
        cy.contains("Add blog").click();
        cy.createBlog({
          title: "first blog",
          author: "Kash",
          url: "http://kash.com",
          likes: "30000",
        });
        cy.contains("first blog");
      });

      describe("edit blog", () => {
        beforeEach(() => {
          cy.login({ username: "Kash", password: "root" });

          cy.createBlog({
            title: "first blog",
            author: "Kash",
            url: "http://kash.com",
            likes: "30000",
          });
        });

        it("can edit blog", () => {
          cy.editBlog({ title: "new change" });

          cy.contains("new change");
        });
      });

      describe("delete blog", () => {
        beforeEach(() => {
          cy.login({ username: "Kash", password: "root" });

          cy.createBlog({
            title: "first blog",
            author: "Kash",
            url: "http://kash.com",
            likes: "30000",
          });

          cy.createBlog({
            title: "second blog",
            author: "Kash",
            url: "http://kash.com",
            likes: "40000",
          });

          cy.createBlog({
            title: "third blog",
            author: "Kash",
            url: "http://kash.com",
            likes: "40000",
          });
        });

        it("can delete a blog", () => {
          cy.deleteBlog();

          cy.get(".title");
          cy.should("not.contain", "third blog");
        });
      });

      describe("most likess", () => {
        beforeEach(() => {
          cy.login({ username: "Kash", password: "root" });

          cy.createBlog({
            title: "first blog with least likes",
            author: "Kash",
            url: "http://kash.com",
            likes: "30000",
          });

          cy.createBlog({
            title: "second blog with more likes",
            author: "Kash",
            url: "http://kash.com",
            likes: "40000",
          });

          cy.createBlog({
            title: "third blog with most likes",
            author: "Kash",
            url: "http://kash.com",
            likes: "400000",
          });
        });

        it("has the most likes", () => {
          cy.get(".title")
            .eq(0)
            .should("contain", "third blog with most likes");

          cy.get(".title")
            .eq(1)
            .should("contain", "second blog with more likes");

          cy.get(".title")
            .eq(0)
            .should("not.contain", "first blog with least likes");
        });
      });
    });
  });
});
