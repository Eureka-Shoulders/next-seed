/* eslint-disable @typescript-eslint/no-var-requires */
require('./checkEnvironmentVars');
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
const moduleExports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3030',
    useMirage: process.env.USE_MIRAGE === 'true' || false,
  },
  i18n: {
    locales: ['default', 'en', 'pt'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = withTM(moduleExports);
