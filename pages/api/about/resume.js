import { getDb } from '../../../lib/db';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const db = await getDb();
      const resumeCollection = db.collection('resume');
      const resume = await resumeCollection.findOne({});
      
      if (resume) {
        return res.status(200).json({ success: true, data: resume });
      } else {
        // Return fallback if no resume in DB
        return res.status(200).json({ 
          success: true, 
          data: { 
            filename: 'resume.pdf',
            path: '/resumes/resume.pdf'
          } 
        });
      }
    }

    res.setHeader('Allow', ['GET']);
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

