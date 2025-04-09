# JK Tech Frontend Assignment

This is the frontend assignment for JKTech. It is built using **Next.js** and **React** with TypeScript, and it includes automated testing, linting, and formatting using tools like **Jest**, **ESLint**, and **Prettier**. Husky hooks are integrated to ensure code quality before committing and pushing changes.

## Tools Integrated

- **Next.js**: Framework for building React applications.
- **React**: Library for building user interfaces.
- **TypeScript**: Superset of JavaScript for static typing.
- **Jest**: Testing framework for unit and integration tests.
- **ESLint**: Linting tool to ensure code quality.
- **Prettier**: Code formatter to enforce consistent styling.
- **Husky**: Git hooks to run checks before commits and pushes.
- **Lint-Staged**: Runs linters on staged files.
- **MSW**: Mock Service Worker for intercepting network requests during tests.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Cross-env**: Sets environment variables across different platforms.

## Setup

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/MrKoolEngineer/jktech-frontend-assignment.git
   cd jktech-frontend-assignment
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root of your project with the following content:

   ```bash
   NODE_ENV=development
   ```

   For production, change NODE_ENV to production.

## Configurations

- **NODE_ENV:** Set to development for local development and production for the production build.

  Example:

  - **Development:** NODE_ENV=development
  - **Production:** NODE_ENV=production

## How to Run Dev Build

To run the application in development mode:

    npm run dev

This will start the Next.js development server at http://localhost:3000.

## How to Test

To run tests with coverage:

    npm run test

For continuous integration testing (CI):

    npm run test:ci

This will run tests with Jest, optimizing the test runner for CI environments.

## How to Format and Lint

To format your code with Prettier:

    npm run format

To check code formatting without modifying it:

    npm run check-format

To lint your code:

    npm run lint

## How Husky Pre-Commit and Pre-Push Work

Husky hooks are set up to ensure code quality:

- **Pre-commit hook:** Runs the lint-staged script, which formats and checks the code before it is committed.

- **Pre-push hook:** Runs lint checks, Prettier formatting checks, and unit tests to ensure that code is clean and tested before it is pushed.

### Workflow

1. **Pre-commit:**

   - Automatically formats staged files using Prettier.

2. **Pre-push:**

   - Runs linting and tests to ensure that no broken code gets pushed to the repository.

If any of the checks fail, the commit or push will be aborted until the issues are fixed.

## How to Create Production Build

To create a production build:

    npm run build

This will build the application with optimizations for production. It will output the build into the .next folder.

## How to Run Production Server

After building the application, you can start the production server:

    npm run start

This will run the application in production mode on http://localhost:3000.

## Additional Information

## Branch Strategy

This project follows a simple Git branching strategy:

- **`master` (main branch)**: The production-ready branch that holds the stable release of the application. This branch is used to deploy the app to production.
- **`develop` (default branch)**: The development branch where all feature branches are merged before they are released. The `develop` branch contains the latest changes, and it is the branch from which feature branches are created.
- **`feature/*` (feature branches)**: These branches are used to develop new features. For example, `feature/auth-pages` would be a branch dedicated to adding authentication pages to the app.

### Workflow

1. **Feature Development**:

   - Start by creating a new feature branch from `develop`. Example:

     git checkout develop
     git checkout -b feature/auth-pages

   - Develop your feature and commit your changes to the feature branch.

2. **Raising Pull Requests (PRs)**:

   - Once the feature is complete, raise a PR from the feature branch (e.g., `feature/auth-pages`) to the `develop` branch.
   - **Squash and merge** commits when merging the PR into `develop` to keep the history clean.
   - After testing and validation in `develop`, raise a PR from `develop` to `master` (the `main` branch).
   - **Merge commit** when merging the PR into `master` to indicate the release.

3. **Release**:
   - When merging from `develop` to `master`, make sure to create a version tag and deploy the changes to production.

### Example Git Commands

- Create a feature branch:

  ```bash
  git checkout develop
  git checkout -b feature/auth-pages
  ```

- Commit and push your changes:

  ```bash
  git add .
  git commit -m "Added authentication pages"
  git push origin feature/auth-pages
  ```

- Create a Pull Request from feature/auth-pages to develop (Squash and merge).

- Once the PR is merged into develop, raise another PR from develop to master (Merge commit).

This approach ensures that the master branch always contains production-ready code, and the develop branch is used for ongoing development and feature integration.

## Analytics Integration

This app supports basic analytics integration. For production, **Plausible Analytics** or **Google Analytics 4 (GA4)** can be added for privacy-first tracking and UX insights. This will help gather insights into user behavior and improve the application based on data-driven decisions.

## Mocked API Calls in Development

**API calls are mocked using MSW (Mock Service Worker).** Please use the following command to run the app locally and access full functionality:

    npm run dev

**Production Build Limitation:** Mocked APIs will not be available in the production build **(npm run build)**. The app is intended to be tested locally in development. Make sure you test all features locally before deploying them in a production environment.

## CI Configuration and Future Enhancements

The current CI pipeline (ci.yml) is designed to handle linting, tests, and builds, making sure only clean, tested code is pushed to the repository.

You can enhance this pipeline for production by adding deployment steps to your CI configuration, such as:

- Deploy to Vercel/AWS/Netlify after a successful build on the main branch.

- Automated notifications (e.g., Slack, email) for build failures or successful deploys.

- Security checks for vulnerabilities using tools like Snyk or Dependabot.

By adding these enhancements, you can ensure that the code is continuously integrated and deployed in a secure and stable manner.
