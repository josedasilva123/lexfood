describe("register", () => {
   it("should complete register flow", () => {
      cy.visit("http://localhost:3000/");

      cy.intercept("POST", "user", {
         statusCode: 200,
         body: {
            message: "Cadastro realizado com sucesso!",
         },
      });

      cy.get(".innerBox a").click();
      cy.get("#name").type("John Doe");
      cy.get("#email").type("testing@example.com.br");
      cy.get("#password").type("@12Patinhos");
      cy.get("#confirmPassword").type("@12Patinhos");
      cy.get("form > button").click();
   });
});
