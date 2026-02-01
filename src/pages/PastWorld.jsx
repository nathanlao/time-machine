import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';
import ShinyButton from '../components/ShinyButton';
import Galaxy from '../components/Galaxy/Galaxy.jsx';

const PastWorld = ({ year, memories, onBack, onYearChange }) => {
  const currentYear = 2026;
  const isPast = year < currentYear;

  const uniqueYears = [...new Set(memories.map((m) => m.year))].sort(
    (a, b) => a - b
  );
  const currentYearIndex = uniqueYears.indexOf(year);
  const yearMemories = memories.filter((m) => m.year === year);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentMemory = yearMemories[currentIndex];

  // Memoize Galaxy to prevent re-renders causing flash
  const galaxyBackground = useMemo(
    () => (
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
    ),
    []
  );

  if (!currentMemory) return null;

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % yearMemories.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + yearMemories.length) % yearMemories.length
      );
      setIsTransitioning(false);
    }, 150);
  };

  const prevYear = () => {
    if (currentYearIndex > 0) {
      onYearChange(uniqueYears[currentYearIndex - 1]);
    }
  };

  const nextYear = () => {
    if (currentYearIndex < uniqueYears.length - 1) {
      onYearChange(uniqueYears[currentYearIndex + 1]);
    }
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
      <div className="absolute inset-0 z-0">{galaxyBackground}</div>
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-5xl font-bold text-[#FFDE21] mb-4 flex items-center justify-center gap-2 drop-shadow-lg">
          Year {year}
        </h1>
        {yearMemories.length > 1 && (
          <p className="text-base text-[#FF0000] mt-2 font-semibold">
            {isPast ? 'Memory' : 'Vision'} {currentIndex + 1} •{' '}
            {yearMemories.length} total
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-12 z-10">
        {yearMemories.length > 1 && (
          <ShinyButton onClick={prev} className="p-6 text-2xl flex-shrink-0">
            ‹
          </ShinyButton>
        )}
        <div className="relative w-[700px] h-[500px] flex items-center justify-center">
          <img
            src={currentMemory.image}
            alt={`Memory from ${year}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
            style={{
              filter: isPast
                ? 'sepia(100%) contrast(1.2) brightness(0.9)'
                : 'none',
              opacity: isTransitioning ? 0 : 1,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg pointer-events-none"></div>
        </div>
        {yearMemories.length > 1 && (
          <ShinyButton onClick={next} className="p-6 text-2xl flex-shrink-0">
            ›
          </ShinyButton>
        )}
      </div>
      <div className="relative z-10 flex items-center justify-center gap-4 mt-12">
        {currentYearIndex > 0 && (
          <ShinyButton onClick={prevYear}>
            ‹ {uniqueYears[currentYearIndex - 1]}
          </ShinyButton>
        )}
        <ShinyButton onClick={onBack}>Back to Timeline</ShinyButton>
        {currentYearIndex < uniqueYears.length - 1 && (
          <ShinyButton onClick={nextYear}>
            {uniqueYears[currentYearIndex + 1]} ›
          </ShinyButton>
        )}
      </div>
    </motion.div>
  );
};

export default PastWorld;
