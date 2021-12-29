/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    useMirage: process.env.USE_MIRAGE || false,
  },
};
