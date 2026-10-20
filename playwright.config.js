import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'list',
  use: {
    baseURL: 'https://your-travel-app.vercel.app', // replace with your production URL
    browserName: 'chromium',
  },
});
