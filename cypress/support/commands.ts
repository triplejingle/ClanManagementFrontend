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
import {GetDataCyElement} from "../e2e/testComponents/GetDataCyElement";
import jwt from "express-jwt";
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
        createbutton(): Chainable<JQuery<HTMLElement>>
        linkbutton(): Chainable<JQuery<HTMLElement>>
    }
  }
}
Cypress.Commands.add("login", (username: string, password: string) => {
    const log = Cypress.log({
        displayName: "AUTH0 LOGIN",
        message: [`🔐 Authenticating | ${username}`],
        // @ts-ignore
        autoEnd: false,
    });
    log.snapshot("before");

    const args = { username, password };
    cy.session(
        `auth0-${username}`,
        () => {
            // App landing page redirects to Auth0.
            cy.visit("http://localhost:3000/login");

            // Login on Auth0.
            cy.origin(Cypress.env("auth0_domain"), { args }, ({ username, password }) => {
                cy.get("input#username").type(username);
                cy.get("input#password").type(password+"{enter}");
            });

            // Ensure Auth0 has redirected us back to the RWA.
            cy.visit('/')
            // cy.url().should("equal", "http://localhost:3000/");
        },
        {
            validate: () => {
                // Validate presence of access token in localStorage.
                cy.wrap(localStorage)
                    .invoke('getItem', 'authAccessToken')
                    .should('exist')
            },
        }
    );

    log.snapshot("after");
    log.end();
});
Cypress.Commands.add("createbutton", ()=>{
    return GetDataCyElement("create");
})

Cypress.Commands.add("linkbutton", ()=>{
    return GetDataCyElement("link");
})