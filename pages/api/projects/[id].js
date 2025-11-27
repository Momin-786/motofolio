import { getDb, collections } from '../../../lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const projectsCollection = db.collection(collections.projects);
    const { id } = req.query;

    if (req.method === 'GET') {
      const project = await projectsCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }

      return res.status(200).json({ success: true, data: project });
    }

    if (req.method === 'PUT') {
      const updateData = {
        ...req.body,
        updatedAt: new Date(),
      };

      const result = await projectsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }

      const updatedProject = await projectsCollection.findOne({
        _id: new ObjectId(id),
      });

      return res.status(200).json({ success: true, data: updatedProject });
    }

    if (req.method === 'DELETE') {
      const result = await projectsCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }

      return res.status(200).json({ success: true, message: 'Project deleted' });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
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


