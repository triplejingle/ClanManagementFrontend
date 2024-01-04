import {loginViaAuth0Ui} from "./testComponents/auth0/login.cy.";
import {navigateTo} from "./testComponents/navbar/navbar";

describe('navigate to event', () => {
  it('check if create button is visible', ()=> {
    loginViaAuth0Ui(
        Cypress.env('auth0_username'),
        Cypress.env('auth0_password')
    )
    cy.visit('/')
    navigateTo("events")
  })
})

