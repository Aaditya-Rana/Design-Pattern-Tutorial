# Cypress E2E Testing

This project includes comprehensive end-to-end tests using Cypress.

## Test Suites

### 1. Authentication Tests (`cypress/e2e/auth.cy.ts`)
- User registration flow
- Login/logout functionality
- Form validation
- Error handling
- Session management

### 2. Pattern Navigation Tests (`cypress/e2e/patterns.cy.ts`)
- Home page pattern display
- Navigation to pattern pages
- Interactive simulations
- Back navigation

### 3. Progress Tracking Tests (`cypress/e2e/progress.cy.ts`)
- Progress bar visibility
- Marking patterns as in-progress
- Marking patterns as completed
- Progress statistics updates
- Status changes

## Running Tests

### Interactive Mode (Cypress UI)
```bash
npm run cypress
```

### Headless Mode
```bash
npm run cypress:headless
```

### With Dev Server (Recommended)
```bash
# Starts dev server and runs Cypress interactively
npm run e2e

# Starts dev server and runs Cypress headless
npm run e2e:headless
```

## Custom Commands

The following custom Cypress commands are available:

- `cy.login(email, password)` - Login with credentials
- `cy.register(name, email, password)` - Register new user

## Test Coverage

- ✅ User registration and login
- ✅ Authentication error handling
- ✅ Pattern navigation
- ✅ Interactive simulations
- ✅ Progress tracking (3 states)
- ✅ Status updates
- ✅ Session persistence

## Prerequisites

- MongoDB running locally
- Environment variables set in `.env.local`
- Dev server running on `http://localhost:3000`

## Notes

- Tests use unique email addresses with timestamps to avoid conflicts
- Cookies are cleared before each test
- Screenshots are captured on test failures
