# Multiple Cypress Configuration Execution Guide

## Overview

This project is now configured to run Cypress tests with multiple configuration files across different Node versions and MongoDB versions using GitHub Actions matrix strategy.

## How It Works

### 1. **Multiple Config Files**

The workflow now uses three different Cypress configuration files:

- **`cypress.config.default.ts`** - Standard configuration file
  - Contains all tests for functionality
  - Excludes tests for missing environment variables

- **`cypress.config.*.ts`** - For local development
  - Contains tests with missing environment variables
  - Excludes standard tests for functionality

### 2. **Matrix Strategy**

The GitHub workflow uses a matrix to create multiple job executions:

```yaml
strategy:
  matrix:
    node-version: [20, 22, 24]
    mongodb-version: [7.0, 8.0]
    cypress-config: [default, collection, database, uri]
```

This creates **15 parallel jobs**:

- 3 Node versions (20, 22, 24)
- 2 MongoDB versions (7.0, 8.0)
- 1 default Cypress configuration
- 3 missing config variations (collection, database, uri)

### 3. **NPM Scripts**

Added npm scripts for each configuration:

```json
"test:local": "cypress run -C cypress.config.uri.ts",
"test:collection": "cypress run -C cypress.config.collection.ts",
"test:database": "cypress run -C cypress.config.database.ts",
"test:uri": "cypress run -C cypress.config.uri.ts"
```

### 4. **Workflow Execution**

For each combination, the workflow:

1. Checks out code
2. Sets up Node.js version
3. Starts MongoDB version
4. Installs dependencies
5. Builds the project
6. Runs tests with the specific configuration
7. Uploads screenshots on failure with descriptive names

## Local Testing

To test locally with different configurations:

```bash
# Test with default config
npm run test:default

# Test with missing collection config
npm run test:collection

# Test with missing database config
npm run test:database

# Test with missing uri config
npm run test:uri
```

## Artifact Management

Screenshots are automatically uploaded on test failure with clear naming:

- Name: `cypress-screenshots-{node-version}-{mongodb-version}-{cypress-config}`
- Path: `cypress/screenshots`
