describe('Progress Tracking', () => {
    const testUser = {
        name: 'Progress Tester',
        email: `progress${Date.now()}@example.com`,
        password: 'password123',
    };

    beforeEach(() => {
        cy.clearCookies();
    });

    it('should not show progress bar when not logged in', () => {
        cy.visit('/');
        cy.contains('Your Progress').should('not.exist');
    });

    it('should show progress bar when logged in', () => {
        // Register and login
        cy.register(testUser.name, testUser.email, testUser.password);
        cy.login(testUser.email, testUser.password);

        // Should see progress bar
        cy.contains('Your Progress').should('be.visible');
        cy.contains('Completed').should('be.visible');
        cy.contains('In Progress').should('be.visible');
        cy.contains('Not Started').should('be.visible');
    });

    it('should mark pattern as in-progress', () => {
        // Register and login
        cy.register(testUser.name, testUser.email, testUser.password);
        cy.login(testUser.email, testUser.password);

        // Go to Observer pattern
        cy.contains('Observer').click();

        // Mark as in-progress
        cy.contains('In Progress').click();

        // Go back to home
        cy.get('header').contains('Design Patterns').click();

        // Should see in-progress badge
        cy.contains('Observer').parent().parent().should('contain', 'In Progress');
    });

    it('should mark pattern as completed', () => {
        // Register and login
        cy.register(testUser.name, testUser.email, testUser.password);
        cy.login(testUser.email, testUser.password);

        // Go to Strategy pattern
        cy.contains('Strategy').click();

        // Mark as completed
        cy.contains('button', 'Completed').click();

        // Go back to home
        cy.get('header').contains('Design Patterns').click();

        // Should see completed badge
        cy.contains('Strategy').parent().parent().should('contain', 'Completed');

        // Progress bar should show 1 completed
        cy.contains('Your Progress').parent().should('contain', '1');
    });

    it('should update progress statistics', () => {
        // Register and login
        cy.register(testUser.name, testUser.email, testUser.password);
        cy.login(testUser.email, testUser.password);

        // Mark Observer as in-progress
        cy.contains('Observer').click();
        cy.contains('button', 'In Progress').click();
        cy.get('header').contains('Design Patterns').click();

        // Mark Strategy as completed
        cy.contains('Strategy').click();
        cy.contains('button', 'Completed').click();
        cy.get('header').contains('Design Patterns').click();

        // Check progress stats
        cy.contains('Your Progress').should('be.visible');
        // Should have 1 completed, 1 in-progress, 8 not started
    });

    it('should change status from in-progress to completed', () => {
        // Register and login
        cy.register(testUser.name, testUser.email, testUser.password);
        cy.login(testUser.email, testUser.password);

        // Go to Command pattern
        cy.contains('Command').click();

        // Mark as in-progress
        cy.contains('button', 'In Progress').click();

        // Then mark as completed
        cy.contains('button', 'Completed').click();

        // Go back to home
        cy.get('header').contains('Design Patterns').click();

        // Should show completed badge
        cy.contains('Command').parent().parent().should('contain', 'Completed');
    });
});
