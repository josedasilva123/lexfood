/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

const autoLogin = () => {
    cy.window().then(window => {
        window.localStorage.setItem("@TOKEN", "123456");
    })
    cy.intercept('user/autologin', {
        statusCode: 200,
        body: {
            user: {
                id: "6368fd43446e687ef917f6fd",
                name: "John Doe",
                email: "testing@example.com.br",
                favoriteRecipes: [],
             }, 
        }
    })
}

const getRecipes = () => {
    cy.intercept("GET", "recipe", {
        statusCode: 200,
        body: {
           count: 1,
           recipes: [
              {
                 _id: "63753f5153c707b2ad83ecbd",
                 userID: "6368fd43446e687ef917f6fd",
                 title: "Receita Exemplo",
                 content: "O conteúdo é obrigatório",
                 thumbnail_filename: "bdacb8b4ff4e6eb74459d37cd6bf7ca9",
                 thumbnail_url: "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg",
                 reviews: [],
                 categories: ["hamburguer"],
                 createdAt: "2022-11-16T19:51:45.790Z",
                 updatedAt: "2022-11-16T19:51:45.790Z",
                 __v: 0,
              },
           ],
        },
     });

}

const getCategories = () => {
    cy.intercept("category", {
        statusCode: 200,
        body: {
           categories: [
              {
                 _id: "637e1c799e648375aeed83ef",
                 slug: "hamburguer",
                 name: "Hamburguer",
                 createdAt: "2022-11-23T13:13:29.958Z",
                 updatedAt: "2022-11-23T13:13:29.958Z",
                 __v: 0,
              },
           ],
        },
     });
}

Cypress.Commands.add('autologin', autoLogin)
Cypress.Commands.add('recipes', getRecipes);
Cypress.Commands.add('categories', getCategories);

declare global {
    namespace Cypress{
        interface Chainable{
            autologin: typeof autoLogin;
            recipes: typeof getRecipes;
            categories: typeof getCategories;
        }
    }
}

export {};