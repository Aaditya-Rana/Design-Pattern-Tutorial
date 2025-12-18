// ***********************************************************
// This support file is processed and loaded automatically before test files.
// ***********************************************************

import '@testing-library/cypress/add-commands';

// Custom commands
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('register', (name: string, email: string, password: string) => {
    cy.visit('/auth/register');
    cy.get('input[id="name"]').type(name);
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<void>;
            register(name: string, email: string, password: string): Chainable<void>;
        }
    }
}
/* eslint-enable @typescript-eslint/no-namespace */

export { };
