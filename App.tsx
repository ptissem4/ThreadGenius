import React from 'react';
import { VercelDebug } from './components/VercelDebug';

const App: React.FC = () => {
  // We are temporarily rendering ONLY the debug component to isolate the environment variable issue on Vercel.
  // This will confirm whether the deployment is picking up the API_KEY.
  return <VercelDebug />;
};

export default App;
