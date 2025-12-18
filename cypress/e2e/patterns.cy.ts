describe('Pattern Navigation', () => {
    const patterns = [
        'observer',
        'strategy',
        'state',
        'command',
        'factory',
        'singleton',
        'builder',
        'adapter',
        'decorator',
        'proxy',
    ];

    beforeEach(() => {
        cy.visit('/');
    });

    it('should display all 10 patterns on home page', () => {
        cy.contains('Available Patterns').should('be.visible');
        cy.contains('10 Patterns Ready').should('be.visible');

        // Check that all pattern cards are visible
        patterns.forEach((pattern) => {
            cy.get('article').should('contain.text', pattern, { matchCase: false });
        });
    });

    it('should navigate to Observer pattern page', () => {
        cy.contains('Observer').click();
        cy.url().should('include', '/patterns/observer');
        cy.contains('Observer Pattern').should('be.visible');
        cy.contains('Interactive Simulation').should('be.visible');
    });

    it('should navigate to Strategy pattern page', () => {
        cy.contains('Strategy').click();
        cy.url().should('include', '/patterns/strategy');
        cy.contains('Strategy Pattern').should('be.visible');
        cy.contains('Interactive Simulation').should('be.visible');
    });

    it('should navigate to Command pattern page', () => {
        cy.contains('Command').click();
        cy.url().should('include', '/patterns/command');
        cy.contains('Command Pattern').should('be.visible');
        cy.contains('Interactive Simulation').should('be.visible');
    });

    it('should have working simulations', () => {
        // Test Observer simulation
        cy.visit('/patterns/observer');
        cy.contains('Publish Message').should('be.visible');
        cy.contains('Publish Message').click();

        // Test Strategy simulation
        cy.visit('/patterns/strategy');
        cy.contains('Bubble Sort').should('be.visible');

        // Test Command simulation
        cy.visit('/patterns/command');
        cy.contains('Add "Hello"').should('be.visible');
        cy.contains('Add "Hello"').click();
        cy.contains('Hello').should('be.visible');
    });

    it('should navigate back to home from pattern page', () => {
        cy.visit('/patterns/observer');
        cy.get('header').contains('Design Patterns').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
});
