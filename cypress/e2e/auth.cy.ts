describe('Authentication Flow', () => {
    const testUser = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123',
    };

    beforeEach(() => {
        // Clear cookies before each test
        cy.clearCookies();
    });

    it('should display the home page', () => {
        cy.visit('/');
        cy.contains('Master Design Patterns').should('be.visible');
        cy.contains('Available Patterns').should('be.visible');
    });

    it('should navigate to register page', () => {
        cy.visit('/');
        cy.contains('Sign Up').click();
        cy.url().should('include', '/auth/register');
        cy.contains('Create Account').should('be.visible');
    });

    it('should register a new user', () => {
        cy.register(testUser.name, testUser.email, testUser.password);

        // Should redirect to login page with success message
        cy.url().should('include', '/auth/login');
        cy.contains('Account created successfully').should('be.visible');
    });

    it('should not register with existing email', () => {
        // First registration
        cy.register(testUser.name, testUser.email, testUser.password);
        cy.url().should('include', '/auth/login');

        // Try to register again with same email
        cy.register(testUser.name, testUser.email, testUser.password);
        cy.contains('User already exists').should('be.visible');
    });

    it('should not register with short password', () => {
        cy.visit('/auth/register');
        cy.get('input[id="name"]').type('Test User');
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('12345'); // Too short
        cy.get('button[type="submit"]').click();

        // HTML5 validation should prevent submission
        cy.get('input[type="password"]:invalid').should('exist');
    });

    it('should login with valid credentials', () => {
        // First register
        cy.register(testUser.name, testUser.email, testUser.password);

        // Then login
        cy.login(testUser.email, testUser.password);

        // Should redirect to home and show user name
        cy.url().should('eq', Cypress.config().baseUrl + '/');
        cy.contains(`Welcome back, ${testUser.name}`).should('be.visible');
        cy.contains('Logout').should('be.visible');
    });

    it('should not login with invalid credentials', () => {
        cy.login('wrong@example.com', 'wrongpassword');
        cy.contains('Invalid credentials').should('be.visible');
    });

    it('should logout successfully', () => {
        // Register and login
        cy.register(testUser.name, testUser.email, testUser.password);
        cy.login(testUser.email, testUser.password);

        // Logout
        cy.contains('Logout').click();

        // Should show login/signup buttons again
        cy.contains('Login').should('be.visible');
        cy.contains('Sign Up').should('be.visible');
    });
});
