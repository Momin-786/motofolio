import { getDb, collections } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const contactInfoCollection = db.collection(collections.contactInfo);

    if (req.method === 'GET') {
      const contactInfo = await contactInfoCollection
        .find({})
        .sort({ order: 1 })
        .toArray();
      
      return res.status(200).json({ success: true, data: contactInfo });
    }

    if (req.method === 'POST') {
      const contactItem = {
        ...req.body,
        updatedAt: new Date(),
      };

      const result = await contactInfoCollection.insertOne(contactItem);
      
      return res.status(201).json({
        success: true,
        data: { ...contactItem, _id: result.insertedId },
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

