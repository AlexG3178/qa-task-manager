import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 10000,
  globalSetup: require.resolve('./tests/setup/auth-setup.ts'),
  use: {
    baseURL: 'http://localhost:3001',
    storageState: 'tests/state/auth.json',
    headless: true
  },
});

