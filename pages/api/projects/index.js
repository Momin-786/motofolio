import { getDb, collections } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const projectsCollection = db.collection(collections.projects);

    if (req.method === 'GET') {
      const projects = await projectsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return res.status(200).json({ success: true, data: projects });
    }

    if (req.method === 'POST') {
      const project = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await projectsCollection.insertOne(project);
      
      return res.status(201).json({
        success: true,
        data: { ...project, _id: result.insertedId },
      });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
}


