/**
 * Script to seed initial contact info data
 * Run with: node scripts/seed-contact-info.js
 */

require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'motofolio';

if (!uri) {
  console.error('MONGODB_URI is not set in .env.local');
  process.exit(1);
}

const contactInfoData = [
  {
    label: 'Email',
    icon: 'Mail',
    value: 'your.email@example.com',
    link: 'mailto:your.email@example.com',
    order: 1,
    type: 'email'
  },
  {
    label: 'Phone',
    icon: 'Phone',
    value: '+92 300 1234567',
    link: 'tel:+923001234567',
    order: 2,
    type: 'phone'
  },
  {
    label: 'GitHub',
    icon: 'Github',
    value: 'github.com/yourusername',
    link: 'https://github.com/yourusername',
    order: 3,
    type: 'social'
  },
  {
    label: 'LinkedIn',
    icon: 'Linkedin',
    value: 'linkedin.com/in/yourusername',
    link: 'https://linkedin.com/in/yourusername',
    order: 4,
    type: 'social'
  },
  {
    label: 'Location',
    icon: 'MapPin',
    value: 'Gujranwala, Punjab, Pakistan',
    order: 5,
    type: 'location'
  }
];

async function seedContactInfo() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('contactInfo');

    // Check if data already exists
    const existing = await collection.countDocuments();
    if (existing > 0) {
      console.log(`Contact info already exists (${existing} items). Skipping seed.`);
      console.log('To re-seed, delete the contactInfo collection first.');
      return;
    }

    // Insert contact info
    const result = await collection.insertMany(contactInfoData);
    console.log(`✅ Successfully seeded ${result.insertedCount} contact info items`);

    console.log('\n📋 Contact Info Items:');
    contactInfoData.forEach((item, index) => {
      console.log(`${index + 1}. ${item.label}: ${item.value}`);
    });

    console.log('\n💡 You can now edit these values in MongoDB Atlas or via the API');
  } catch (error) {
    console.error('Error seeding contact info:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDisconnected from MongoDB');
  }
}

seedContactInfo();

