import { getDb, collections } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const aboutCollection = db.collection(collections.about);

    if (req.method === 'GET') {
      const aboutSections = await aboutCollection
        .find({})
        .sort({ order: 1 })
        .toArray();
      
      return res.status(200).json({ success: true, data: aboutSections });
    }

    if (req.method === 'POST') {
      const section = {
        ...req.body,
        updatedAt: new Date(),
      };

      const result = await aboutCollection.insertOne(section);
      
      return res.status(201).json({
        success: true,
        data: { ...section, _id: result.insertedId },
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


