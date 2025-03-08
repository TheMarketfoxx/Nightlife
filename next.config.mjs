import { withPayload } from "@payloadcms/next/withPayload";
import { withPayload } from "@payloadcms/next/withPayload";
import { withPayload } from "@payloadcms/next/withPayload";
import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default withPayload(withPayload(withPayload(withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  ...nextConfig,
}))));
