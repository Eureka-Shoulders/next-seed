/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(
  [
    '@euk-labs/formix',
    '@euk-labs/componentz',
    '@euk-labs/beltz',
    '@euk-labs/fetchx',
    '@euk-labs/formix-mui',
  ],
  {
    resolveSymlinks: false,
  }
);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3030',
    useMirage: process.env.USE_MIRAGE === 'true' || false,
  },
  i18n: {
    /**
     * Provide the locales you want to support in your application
     */
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
});
