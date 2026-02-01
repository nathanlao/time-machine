import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import Timeline from './components/Timeline';

function App() {
  const [memories, setMemories] = useState([]);

  const handleUpload = (newMemory) => {
    const allMemories = [...memories, newMemory];
    const sortedMemories = allMemories.sort((a, b) => b.year - a.year);
    setMemories(sortedMemories);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8"></header>
        <main className="flex flex-col items-center space-y-8">
          <ImageUploader onUpload={handleUpload} />
          <Timeline memories={memories} />
        </main>
      </div>
    </div>
  );
}

export default App;
