import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ShinyButton from '../components/ShinyButton';
import Galaxy from '../components/Galaxy/Galaxy.jsx';

const PastWorld = ({ year, memories, onBack }) => {
  const yearMemories = memories.filter((m) => m.year === year);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMemory = yearMemories[currentIndex];

  if (!currentMemory) return null;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % yearMemories.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + yearMemories.length) % yearMemories.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-8 relative"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 z-0">
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={false}
          density={1.5}
          glowIntensity={0.1}
          saturation={0.5}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={1}
          starSpeed={0.5}
          speed={1}
        />
      </div>
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl font-bold text-[#0096e7] mb-4 flex items-center justify-center gap-2">
          Welcome to {year}
        </h1>
        <p className="text-lg text-gray-300 italic">
          A magical glimpse into the past...
        </p>
        {yearMemories.length > 1 && (
          <p className="text-sm text-[#0096e7] mt-2 font-semibold">
            📸 Photo {currentIndex + 1} of {yearMemories.length} 📸
          </p>
        )}
      </div>
      <div className="relative flex items-center justify-center z-10">
        {yearMemories.length > 1 && (
          <button
            onClick={prev}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 p-6 bg-[#0096e7] text-white rounded-full hover:bg-[#0078b9] transition-all duration-300 shadow-lg hover:scale-110"
            style={{ fontSize: '2rem' }}
          >
            ‹
          </button>
        )}
        <img
          src={currentMemory.image}
          alt={`Memory from ${year}`}
          className="max-w-full max-h-96 object-contain rounded-lg shadow-2xl"
          style={{
            filter: 'sepia(100%) contrast(1.2) brightness(0.9)',
          }}
        />
        {yearMemories.length > 1 && (
          <button
            onClick={next}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 p-6 bg-[#0096e7] text-white rounded-full hover:bg-[#0078b9] transition-all duration-300 shadow-lg hover:scale-110"
            style={{ fontSize: '2rem' }}
          >
            ›
          </button>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
      </div>
      <div className="relative z-10">
        <ShinyButton onClick={onBack} className="mt-8">
          Back to Timeline
        </ShinyButton>
      </div>
    </motion.div>
  );
};

export default PastWorld;
