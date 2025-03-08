import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'wcv3rl7c', // Replace with your project ID
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
});