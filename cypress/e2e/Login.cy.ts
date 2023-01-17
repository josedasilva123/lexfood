describe("login", () => {
   it("should be able to login user", () => {
      cy.visit("http://localhost:3000");

      cy.intercept("POST", "user/login", {
         statusCode: 200,
         body: {
            user: {
               id: "6368fd43446e687ef917f6fd",
               name: "John Doe",
               email: "testing@example.com.br",
               favoriteRecipes: [],
            },
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjhmZDQzNDQ2ZTY4N2VmOTE3ZjZmZCIsImlhdCI6MTY2ODYyNzQyNiwiZXhwIjoxNjY4NjcwNjI2fQ.UAM0XmnwfsaHT045QbBlmGxuQZ5cjN9KGGkuTvAJ_YA",
         },
      });

      cy.recipes();
      
      cy.get("#email").type("testing@example.com.br");
      cy.get("#password").type("@12Patinhos");
      cy.get("form > button").click();
   });
});
