# GitHub Actions lessons

A short course in this repo. Read the workflow files in order, push to `main`, then open the **Actions** tab and confirm each run is green.

## Lessons

1. [`.github/workflows/01-hello.yml`](.github/workflows/01-hello.yml) — one job, a few steps, and the `github` context (`event_name`, `sha`). Runs on push to `main`, or when you start it by hand with **Run workflow**.
2. [`.github/workflows/02-jobs.yml`](.github/workflows/02-jobs.yml) — two jobs. `report` uses `needs: setup`, so it runs only after `setup` succeeds.
3. [`.github/workflows/03-env-and-secrets.yml`](.github/workflows/03-env-and-secrets.yml) — workflow `env`, step `env`, and a repository secret. If the secret is missing, the step prints a fallback and still passes.

## Secret used by lesson 3

1. On GitHub, open **Settings → Secrets and variables → Actions**.
2. Choose **New repository secret**.
3. Name it `DEMO_GREETING` and set any greeting as the value.
4. Re-run **03 Env and secrets**. GitHub masks the secret in the log, so the printed line shows as `***`.

## App CI

[`src/greet.js`](src/greet.js) is a tiny Node module. [`.github/workflows/ci.yml`](.github/workflows/ci.yml) checks it out, installs Node 22, and runs `npm test` on every push and pull request to `main`. CI does not need a secret.

Locally:

```bash
npm test
npm run lint
```
