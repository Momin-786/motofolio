import { getDb, collections } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const skillsCollection = db.collection(collections.skills);

    if (req.method === 'GET') {
      const { category } = req.query;
      
      const query = category ? { category } : {};
      const skills = await skillsCollection
        .find(query)
        .sort({ category: 1, name: 1 })
        .toArray();
      
      return res.status(200).json({ success: true, data: skills });
    }

    if (req.method === 'POST') {
      const skill = {
        ...req.body,
        createdAt: new Date(),
      };

      const result = await skillsCollection.insertOne(skill);
      
      return res.status(201).json({
        success: true,
        data: { ...skill, _id: result.insertedId },
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


