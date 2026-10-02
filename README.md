# GitHub Actions lessons

A short course in this repo. Read the workflow files in order, push to `main`, then open the **Actions** tab and confirm each run is green.

## Lessons

1. [`.github/workflows/01-hello.yml`](.github/workflows/01-hello.yml) — one job, a few steps, and the `github` context (`event_name`, `sha`). Runs on push to `main`, or when you start it by hand with **Run workflow**.
2. [`.github/workflows/02-jobs.yml`](.github/workflows/02-jobs.yml) — two jobs. `report` uses `needs: setup`, so it runs only after `setup` succeeds.
3. [`.github/workflows/03-env-and-secrets.yml`](.github/workflows/03-env-and-secrets.yml) — workflow `env`, step `env`, and a repository secret. If the secret is missing, the step prints a fallback and still passes.
4. [`.github/workflows/04-matrix.yml`](.github/workflows/04-matrix.yml) — the same test job on Node 20 and Node 22. `fail-fast: false` lets both finish. `setup-node` caches npm.
5. [`.github/workflows/05-artifacts.yml`](.github/workflows/05-artifacts.yml) — `build` uploads `dist/release.txt`. `check` downloads it. Jobs do not share a disk.
6. [`.github/workflows/06-reusable.yml`](.github/workflows/06-reusable.yml) — calls [`.github/workflows/reusable-node-test.yml`](.github/workflows/reusable-node-test.yml) twice, with a different `node-version` input each time.
7. [`.github/workflows/07-deploy.yml`](.github/workflows/07-deploy.yml) — test, build, upload an artifact, then deploy. Start it by hand with **Run workflow** and choose `staging` or `production`. `concurrency` cancels an older deploy of the same branch.

## Secret used by lesson 3

1. On GitHub, open **Settings → Secrets and variables → Actions**.
2. Choose **New repository secret**.
3. Name it `DEMO_GREETING` and set any greeting as the value.
4. Re-run **03 Env and secrets**. GitHub masks the secret in the log, so the printed line shows as `***`.

## Branches

Work lands on `develop` first. `main` is updated only by merging `develop`.

1. Open a pull request into `develop`. [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on that pull request and on pushes to `develop` and `main`.
2. Merge the pull request. [`.github/workflows/develop-merge.yml`](.github/workflows/develop-merge.yml) tests, builds, and records the result in the `staging` environment.
3. Open a pull request from `develop` into `main` and merge it. [`.github/workflows/release.yml`](.github/workflows/release.yml) runs only for that merge and records the result in the `production` environment.

## App CI

[`src/greet.js`](src/greet.js) is a tiny Node module. [`scripts/build.js`](scripts/build.js) writes `dist/release.txt`. CI caches npm, installs Node 22, and runs `npm test`. It does not need a secret.

Locally:

```bash
npm test
npm run lint
npm run build
```
