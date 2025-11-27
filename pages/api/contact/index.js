import { getDb, collections } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const contactCollection = db.collection(collections.contact);

    if (req.method === 'POST') {
      const { name, email, subject, message } = req.body;

      // Basic validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          error: 'All fields are required',
        });
      }

      const contactMessage = {
        name,
        email,
        subject,
        message,
        read: false,
        createdAt: new Date(),
      };

      const result = await contactCollection.insertOne(contactMessage);
      
      return res.status(201).json({
        success: true,
        data: { ...contactMessage, _id: result.insertedId },
        message: 'Message sent successfully',
      });
    }

    res.setHeader('Allow', ['POST']);
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


