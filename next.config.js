const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['api.ts']
}

module.exports = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig)
