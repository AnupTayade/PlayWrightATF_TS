# Playwright ATF

Playwright automation framework for UI and API testing of the eCommerce client.Only for Study Purpose 

## Prerequisites

- Git
- A current Node.js LTS release, which includes npm
- A test account for the target environment

## Get Started

Clone the repository, install dependencies, and install the Chromium browser used by the current Playwright project:

```powershell
git clone https://github.com/AnupTayade/PlayWrightATF_TS.git
cd PlaywrightATF
npm install
npx playwright install chromium
```

Create your local default environment file if it does not exist and add user details

Ex: .env
BASE_URL=https://rahulshettyacademy.com/client/#/auth/login
API_BASE_URL=https://rahulshettyacademy.com
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
HEADLESS=false
```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Open `.env` and set `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` to credentials for a dedicated test account. Check that `BASE_URL` and `API_BASE_URL` point to the intended test system. Do not use a personal account or commit local `.env` files.

Run the full suite:

```powershell
npm test
```

## Environments

When `TEST_ENV` is not set, tests load `.env`. To use QA, STG, or Prod, first create the matching local file from its example and replace its placeholder URLs and credentials with values for that environment:

```powershell
if (-not (Test-Path .env.qa)) { Copy-Item .env.qa.example .env.qa }
if (-not (Test-Path .env.stg)) { Copy-Item .env.stg.example .env.stg }
if (-not (Test-Path .env.prod)) { Copy-Item .env.prod.example .env.prod }
```

Select an environment for the current PowerShell session, then run a test command:

```powershell
$env:TEST_ENV = 'qa'
npm test
Remove-Item Env:TEST_ENV
```

Use `stg` or `prod` in place of `qa` as needed. The selected `.env.<environment>` file overrides values from `.env`; values omitted from the selected file fall back to `.env`. A missing selected file causes Playwright to stop with an error. Local `.env` files are ignored by Git; example files contain no credentials. In CI, provide credentials using the CI platform's encrypted secrets.

## Test Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run all API and UI tests |
| `npm run test:ui` | Run UI tests |
| `npm run test:api` | Run API and data-validation tests |
| `npm run test:headed` | Run the suite with a visible browser |
| `npx playwright test tests/ui/ShoppingFromCSV.spec.ts` | Run the CSV-driven order scenario |
| `npm run typecheck` | Run the TypeScript check |
| `npm run report` | Open the latest HTML report after a test run |

## Current Scenarios

- `tests/api/health.spec.ts`: checks that the API client can reach the host.
- `tests/api/data-validation.spec.ts`: reads `test-data/products.csv` and checks its columns and product row.
- `tests/ui/shopping.spec.ts`: adds a product to the cart, removes it, and checks the checkout flow.
- `tests/ui/ShoppingFromCSV.spec.ts`: reads the product name from CSV, logs in, adds the product, and places an order.

## Project Layout

- `src/fixtures`: shared Playwright fixtures and test composition root
- `src/pages`: page objects for login, dashboard, cart, and payment
- `src/api`: domain API services; `src/core/api-client.ts` provides shared HTTP behavior
- `src/core`: runtime configuration and shared API client
- `src/utils`: CSV and Excel readers and validation helpers
- `tests/ui`, `tests/api`: UI and API test specs
- `test-data`: external test data, including `products.csv`

UI tests should use the shared fixtures and page objects. Add API services under `src/api` by composing `ApiClient`, and register injectable services in `src/fixtures/test.fixture.ts`. Keep credentials in ignored local environment files or CI secrets, never in source control.
