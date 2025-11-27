import Ubuntu from "../components/ubuntu";
import ReactGA from 'react-ga4';
import Meta from "../components/SEO/Meta";
import { getDb, collections } from '../lib/db';

// const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
// ReactGA.initialize(TRACKING_ID);

export async function getServerSideProps() {
  try {
    const db = await getDb();
    
    // Fetch all data in parallel
    const [projects, skills, about] = await Promise.all([
      db.collection(collections.projects).find({}).sort({ createdAt: -1 }).toArray(),
      db.collection(collections.skills).find({}).sort({ category: 1, name: 1 }).toArray(),
      db.collection(collections.about).find({}).sort({ order: 1 }).toArray(),
    ]);

    return {
      props: {
        projectsData: JSON.parse(JSON.stringify(projects)), // Convert ObjectId to string
        skillsData: JSON.parse(JSON.stringify(skills)),
        aboutData: JSON.parse(JSON.stringify(about)),
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return empty data if database not available
    return {
      props: {
        projectsData: [],
        skillsData: [],
        aboutData: [],
      },
    };
  }
}

function App({ projectsData, skillsData, aboutData }) {
  return (
    <>
      <Meta />
      <Ubuntu 
        projectsData={projectsData} 
        skillsData={skillsData} 
        aboutData={aboutData} 
      />
    </>
  )
}

export default App;
