import LandingPage from './pages/LandingPage';
import PastWorld from './pages/PastWorld';
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Timeline from './components/Timeline/Timeline.jsx';

function App() {
  const [memories, setMemories] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);
  const [cameraAnimating, setCameraAnimating] = useState(false);
  const [currentYear, setCurrentYear] = useState(null);
  const hasLoadedInitialRef = useRef(false);

  const handleUpload = (newMemories, options = {}) => {
    // Prevent duplicate loading of demo memories using ref (synchronous check)
    if (options.isPreload && hasLoadedInitialRef.current) {
      return;
    }
    if (options.isPreload) {
      hasLoadedInitialRef.current = true;
    }

    setMemories((prevMemories) => {
      // Deduplicate by checking if memory already exists (by image path)
      const existingImages = new Set(prevMemories.map((m) => m.image));
      const uniqueNewMemories = newMemories.filter(
        (m) => !existingImages.has(m.image)
      );
      const allMemories = [...prevMemories, ...uniqueNewMemories];
      return allMemories.sort((a, b) => b.year - a.year);
    });
  };

  const handleTimeMachineClick = () => {
    if (memories.length > 0) {
      setCameraAnimating(true); // Delay timeline appearance until model animation finishes
      setTimeout(() => {
        setShowTimeline(true);
      }, 6500);
    }
  };

  const [selectedTimelineYear, setSelectedTimelineYear] = useState(null);

  const handleYearClick = (year) => {
    setSelectedTimelineYear(year);
    setCurrentYear(year);
  };

  const handleBack = () => {
    setCurrentYear(null);
    setCameraAnimating(false);
    // Keep selectedTimelineYear so Timeline remembers the position
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!currentYear && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="text-center"></header>
            <main className="flex flex-col space-y-8">
              <LandingPage
                onUpload={handleUpload}
                onTimeMachineClick={handleTimeMachineClick}
                isClickable={memories.length > 0}
                cameraAnimating={cameraAnimating}
              />
              {showTimeline && (
                <Timeline
                  memories={memories}
                  onYearClick={handleYearClick}
                  onClose={() => setShowTimeline(false)}
                  selectedYear={selectedTimelineYear}
                />
              )}
            </main>
          </motion.div>
        )}
        {currentYear && (
          <PastWorld
            key={`past-${currentYear}`}
            year={currentYear}
            memories={memories}
            onBack={handleBack}
            onYearChange={setCurrentYear}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
