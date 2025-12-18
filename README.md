# Design Patterns Tutorial Platform

A production-grade, interactive learning platform for software design patterns with authentication, progress tracking, and visual simulations built with Next.js, TypeScript, MongoDB, and Framer Motion.

## 🚀 Features

- **10 Design Patterns** with interactive simulations and comprehensive documentation
- **User Authentication** with JWT-based session management
- **Progress Tracking** with three states (not-started, in-progress, completed)
- **Interactive Simulations** using Framer Motion for 10 patterns
- **Responsive Design** with Tailwind CSS
- **Type Safety** with TypeScript
- **Comprehensive Testing** with Jest (unit) and Cypress (E2E)
- **CI/CD Pipeline** with GitHub Actions
- **Code Quality** with ESLint, Prettier, and Husky pre-commit hooks

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Design Patterns](#design-patterns)
- [Contributing](#contributing)

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Content**: MDX for documentation
- **Icons**: Lucide React

### Backend
- **API**: Next.js Route Handlers
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **Session**: httpOnly cookies

### Testing & Quality
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Cypress
- **Linting**: ESLint
- **Formatting**: Prettier
- **Git Hooks**: Husky
- **CI/CD**: GitHub Actions

## 📦 Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: v6.x or higher (local or Atlas)
- **Git**: v2.x or higher

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Aaditya-Rana/Design-Pattern-Tutorial.git
cd Design-Pattern-Tutorial
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/design-patterns
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

4. **Start MongoDB** (if running locally)
```bash
# macOS/Linux
mongod

# Windows
net start MongoDB
```

## 🌍 Environment Setup

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/design-patterns` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-min-32-chars` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run cypress` | Open Cypress UI |
| `npm run cypress:headless` | Run Cypress tests headless |
| `npm run e2e` | Start dev server + run Cypress |
| `npm run e2e:headless` | Start dev server + run Cypress headless |

## 🧪 Testing

### Unit Tests (Jest)

**Run all unit tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm run test:watch
```

**Test Coverage:**
- ✅ Authentication utilities (password hashing, JWT)
- ✅ Pattern domain logic (Observer, Strategy, State)
- ✅ API contract validation

**Total Unit Tests:** 25 tests

### E2E Tests (Cypress)

**Interactive mode (recommended for development):**
```bash
npm run cypress
```

**Headless mode (for CI/CD):**
```bash
npm run cypress:headless
```

**With auto-start dev server:**
```bash
npm run e2e              # Interactive
npm run e2e:headless     # Headless
```

**Test Suites:**
1. **Authentication** (`cypress/e2e/auth.cy.ts`) - 8 tests
   - User registration
   - Login/logout
   - Form validation
   - Error handling

2. **Pattern Navigation** (`cypress/e2e/patterns.cy.ts`) - 6 tests
   - Home page display
   - Pattern navigation
   - Interactive simulations

3. **Progress Tracking** (`cypress/e2e/progress.cy.ts`) - 6 tests
   - Progress bar visibility
   - Status updates (not-started/in-progress/completed)
   - Statistics tracking

**Total E2E Tests:** 20 tests

## 🎨 Code Quality

### Linting (ESLint)

**Run linter:**
```bash
npm run lint
```

**ESLint Configuration:**
- Extends Next.js recommended config
- TypeScript strict rules
- React hooks rules
- Custom rules for code quality

### Formatting (Prettier)

**Configuration** (`.prettierrc`):
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100
}
```

**Format code:**
```bash
npx prettier --write .
```

### Git Hooks (Husky)

**Pre-commit hook** automatically runs:
1. ESLint on staged files
2. Prevents commits with linting errors

**Setup:**
```bash
npm run prepare
```

### CI/CD Pipeline

**GitHub Actions** (`.github/workflows/ci.yml`):
- Runs on push to `develop` and `main`
- Executes linting
- Runs unit tests
- Builds the application

## 📡 API Documentation

### Authentication APIs

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "Account created successfully. Please login.",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Errors:**
- `400`: Missing fields or password too short
- `409`: User already exists

---

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Sets Cookie:** `auth-token` (httpOnly, 7 days)

**Errors:**
- `400`: Missing email or password
- `401`: Invalid credentials

---

#### GET `/api/auth/me`
Get current user information.

**Headers:** `Cookie: auth-token=<jwt>`

**Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Errors:**
- `401`: Not authenticated or invalid token
- `404`: User not found

---

#### POST `/api/auth/logout`
Logout current user.

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

**Clears Cookie:** `auth-token`

---

### Progress Tracking APIs

#### GET `/api/progress`
Get user's progress for all patterns.

**Headers:** `Cookie: auth-token=<jwt>`

**Response (200):**
```json
{
  "progress": [
    {
      "patternSlug": "observer",
      "status": "completed",
      "completedAt": "2024-01-15T10:30:00Z"
    },
    {
      "patternSlug": "strategy",
      "status": "in-progress"
    }
  ]
}
```

**Errors:**
- `401`: Not authenticated

---

#### POST `/api/progress`
Update pattern progress status.

**Headers:** `Cookie: auth-token=<jwt>`

**Request Body:**
```json
{
  "patternSlug": "observer",
  "status": "completed"
}
```

**Valid Status Values:**
- `not-started`
- `in-progress`
- `completed`

**Response (200):**
```json
{
  "progress": {
    "patternSlug": "observer",
    "status": "completed",
    "completedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Errors:**
- `400`: Missing fields or invalid status
- `401`: Not authenticated

---

### Pattern Catalog API

#### GET `/api/patterns`
Get list of all available patterns.

**Response (200):**
```json
{
  "patterns": [
    {
      "id": 1,
      "name": "Observer",
      "slug": "observer",
      "type": "Behavioral",
      "description": "Define a one-to-many dependency...",
      "difficulty": "Intermediate"
    }
  ]
}
```

## 📁 Project Structure

```
design-pattern-tutorial/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI/CD
├── .husky/
│   └── pre-commit                 # Git pre-commit hook
├── cypress/
│   ├── e2e/                       # E2E test suites
│   │   ├── auth.cy.ts
│   │   ├── patterns.cy.ts
│   │   └── progress.cy.ts
│   ├── support/
│   │   └── e2e.ts                 # Custom Cypress commands
│   └── README.md
├── src/
│   ├── app/
│   │   ├── api/                   # Next.js Route Handlers
│   │   │   ├── auth/
│   │   │   │   ├── register/
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   └── me/
│   │   │   ├── patterns/
│   │   │   └── progress/
│   │   ├── auth/                  # Auth pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── patterns/              # Pattern pages
│   │   │   ├── observer/
│   │   │   ├── strategy/
│   │   │   └── [slug]/
│   │   └── page.tsx               # Home page
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.tsx
│   │   ├── patterns/
│   │   │   └── MarkCompleteButton.tsx
│   │   └── progress/
│   │       └── ProgressBar.tsx
│   ├── content/
│   │   └── patterns/              # MDX documentation
│   │       ├── observer.mdx
│   │       ├── strategy.mdx
│   │       └── ...
│   ├── core/
│   │   ├── data/
│   │   │   └── patterns.ts        # Pattern metadata
│   │   └── patterns/              # Pattern implementations
│   │       ├── observer/
│   │       │   ├── domain/        # Business logic
│   │       │   └── presentation/  # React components
│   │       ├── strategy/
│   │       └── ...
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useProgress.ts
│   ├── lib/
│   │   ├── auth/
│   │   │   └── utils.ts           # Auth utilities
│   │   ├── db/
│   │   │   └── mongodb.ts         # DB connection
│   │   └── models/                # Mongoose models
│   │       ├── User.ts
│   │       └── UserProgress.ts
│   └── __tests__/                 # Unit tests
├── .env.example
├── .env.local
├── .eslintrc.json
├── .prettierrc
├── cypress.config.ts
├── jest.config.ts
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Design Patterns

### Implemented Patterns (10/10)

| # | Pattern | Type | Simulation | Difficulty |
|---|---------|------|------------|------------|
| 1 | Observer | Behavioral | ✅ Pub/Sub notifications | Intermediate |
| 2 | Strategy | Behavioral | ✅ Sorting algorithms | Beginner |
| 3 | State | Behavioral | ✅ Document workflow | Intermediate |
| 4 | Command | Behavioral | ✅ Undo/redo editor | Intermediate |
| 5 | Factory Method | Creational | ✅ UI component factory | Beginner |
| 6 | Singleton | Creational | ✅ DB connection | Beginner |
| 7 | Builder | Creational | ✅ Pizza builder | Intermediate |
| 8 | Adapter | Structural | ✅ Payment adapter | Beginner |
| 9 | Decorator | Structural | ✅ Coffee decorator | Intermediate |
| 10 | Proxy | Structural | ✅ Image lazy loading | Intermediate |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Write unit tests for business logic
- Write E2E tests for user flows
- Ensure ESLint passes before committing
- Use conventional commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Aaditya Rana** - [GitHub](https://github.com/Aaditya-Rana)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for smooth animations
- MongoDB team for the database
- All contributors and pattern enthusiasts

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**
