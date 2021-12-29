/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(
  ['@euk-labs/formix', '@euk-labs/componentz', '@euk-labs/fetchx'],
  {
    resolveSymlinks: true,
  }
);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withPlugins([withBundleAnalyzer, withTM], {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3030',
    useMirage: process.env.USE_MIRAGE || false,
  },
});
