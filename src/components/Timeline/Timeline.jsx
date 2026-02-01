import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ShinyButton from '../ShinyButton';

const Timeline = ({ memories, onYearClick, onClose, selectedYear }) => {
  const uniqueYears = [...new Set(memories.map((m) => m.year))].sort(
    (a, b) => a - b
  );
  // Use selectedYear if provided and valid, otherwise default to first year
  const initialYear =
    selectedYear && uniqueYears.includes(selectedYear)
      ? selectedYear
      : uniqueYears[0] || null;
  const [currentYear, setCurrentYear] = useState(initialYear);

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const updateTimeline = (year) => {
    setCurrentYear(year);
    if (onYearClick) onYearClick(year);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = uniqueYears.indexOf(currentYear);
      if (e.key === 'ArrowLeft') {
        const newIndex = Math.max(0, currentIndex - 1);
        updateTimeline(uniqueYears[newIndex]);
      }
      if (e.key === 'ArrowRight') {
        const newIndex = Math.min(uniqueYears.length - 1, currentIndex + 1);
        updateTimeline(uniqueYears[newIndex]);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentYear, uniqueYears]);

  const progress =
    uniqueYears.length > 0
      ? ((uniqueYears.indexOf(currentYear) + 1) / uniqueYears.length) * 100
      : 0;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 p-13 z-50 overflow-hidden"
      variants={containerVariants}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        background:
          'linear-gradient(to bottom, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.95))',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(147, 197, 253, 0.15)',
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div className="absolute top-4 right-4 z-10">
        <ShinyButton onClick={onClose} className="p-3 text-lg">
          ✕
        </ShinyButton>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Years container */}
        <div className="flex justify-center gap-12 mb-6 overflow-x-auto pt-4 pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {uniqueYears.map((year) => (
            <motion.div
              key={year}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 min-w-[100px] ${
                year === currentYear ? 'scale-110' : 'hover:scale-105'
              }`}
              onClick={() => updateTimeline(year)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`text-sm font-semibold uppercase tracking-wider transition-all duration-300 mb-4 ${
                  year === currentYear
                    ? 'text-[#FFDE21] transform -translate-y-1'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                {year}
              </div>
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                  year === currentYear
                    ? 'bg-[#00d4ff] border-[#FFDE21] shadow-lg'
                    : 'bg-transparent border-[#00d4ff]/40 hover:border-[#00d4ff]/80'
                }`}
                style={
                  year === currentYear
                    ? {
                        boxShadow:
                          '0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(249, 115, 22, 0.3)',
                      }
                    : {}
                }
              />
            </motion.div>
          ))}
        </div>

        {/* Timeline line */}
        <div className="relative h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded mt-2">
          <motion.div
            className="absolute h-full bg-[#00d4ff] rounded shadow-lg"
            style={{
              boxShadow:
                '0 0 20px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.4)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
