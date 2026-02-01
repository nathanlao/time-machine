import LandingPage from './pages/LandingPage';
import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import Timeline from './components/Timeline';

function App() {
  const style = {
    width: '100vw',
    height: '100vh',
  };
  const [memories, setMemories] = useState([]);

  const handleUpload = (newMemory) => {
    const allMemories = [...memories, newMemory];
    const sortedMemories = allMemories.sort((a, b) => b.year - a.year);
    setMemories(sortedMemories);
  };

  return (
    <div className="min-h-screen">
        <header className="text-center"></header>
        <main className="flex flex-col space-y-8">
          <LandingPage onUpload={handleUpload} />
          <Timeline memories={memories} />
        </main>
    </div>
  );
}

export default App;
