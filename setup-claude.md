# Setup for Claude Code

This file is for Claude Code. The user has installed Claude Code and Node.js, unzipped this project and asked you to follow this file.

Goal: this project running on Vercel, with the smoke test passing.

Carry out steps 1–7 in order, in this folder. Every step is safe to repeat.

## Rules

These rules apply only while you carry out this setup. They are not rules for working on the project afterwards.

- Run only the commands listed here. Ask the user before running anything else.
- Never use `sudo`, administrator rights or global installs (`npm install -g`).
- The only file you may change is `playwright.config.js`, in step 5. Don't change application code, tests or package files to make a step pass.
- Don't run `npx vercel login` yourself. It needs an interactive terminal, so the user runs it in their own window (step 3).
- Don't create temporary deployments (`--temporary`).
- If a step fails and the fix isn't described here, stop. Show the user the failing command and the key lines of the error, so they can get help.

## Step 1: Check Node.js

Run: `node --version`

Expected: version 20.9 or later.

If it fails or the version is older: ask the user to install the LTS version of Node.js from [nodejs.org](https://nodejs.org), then open a new terminal window and start Claude Code again in this folder.

## Step 2: Install the project

Run: `npm install`

This installs the project's dependencies, including Vercel's command-line tool, and downloads the browser Playwright uses. It can take a few minutes.

Expected: finishes without errors.

If it fails with "running scripts is disabled on this system" (Windows): ask the user to run this command in PowerShell and answer `Y`, then repeat this step:

```
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## Step 3: Check the Vercel sign-in

Run: `npx vercel whoami`

Expected: a Vercel username.

If it prints "Logged out": ask the user to sign in. Tell them to:

1. open a second terminal window,
2. go to this folder with `cd`, using its full path, which you give them,
3. run `npx vercel login` and finish the sign-in in their browser,
4. tell you when they're done.

Wait until they confirm. Then run this step again.

## Step 4: Deploy

Run: `npm run deploy`

This builds the site on Vercel and publishes it. The first run also creates the Vercel project and links this folder to it. It can take a few minutes.

Expected: a line starting with **Aliased**, followed by an address like `https://travel-workshop-abc.vercel.app`. That is the site's fixed production address. Don't use the address on the **Production** line: it changes with every deploy and is protected.

If there is no Aliased line: ask the user to copy the address shown under **Domains** for the project in the Vercel dashboard.

## Step 5: Point the tests at the site

In `playwright.config.js`, set `baseURL` to the production address from step 4. Change nothing else.

## Step 6: Run the smoke test

Run: `npm test`

Expected: all tests pass.

If a test fails with status 401 or shows a Vercel sign-in page: the address is the protected deployment address. Redo step 5 with the Aliased address and run this step again.

If a test fails right after the deploy: wait 30 seconds and run this step once more.

## Step 7: Report

Tell the user:

- The site's production address.
- The smoke test result.
- Anything that needed their help, or that failed.
