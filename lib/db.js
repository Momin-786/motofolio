import clientPromise from './mongodb';

const dbName = process.env.MONGODB_DB || 'motofolio';

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}

// Collections
export const collections = {
  projects: 'projects',
  skills: 'skills',
  about: 'about',
  contact: 'contact',
};


