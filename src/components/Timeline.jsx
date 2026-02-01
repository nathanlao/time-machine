import { motion } from 'framer-motion';

const Timeline = ({ memories }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="max-w-md mx-auto p-4 md:max-w-lg lg:max-w-xl">
      <motion.div
        className="relative pl-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={memories.length}
      >
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#0096e7] rounded-full"></div>

        {memories.map((memory, index) => (
          <motion.div
            key={`${index}-${memory.year}`}
            className="relative mb-8"
            variants={itemVariants}
          >
            <div className="absolute -left-[26px] top-6 w-6 h-6 bg-[#d91e18] border-4 border-[#f1c40f] rounded-full shadow-md z-10"></div>
            <div className="bg-white p-4 rounded-2xl border-2 border-[#0096e7] relative overflow-hidden">
              <img
                src={memory.image}
                alt={`Memory from ${memory.year}`}
                className="w-full max-w-[200px] mx-auto h-auto rounded-xl border-2 border-gray-100"
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="font-bold text-[#0096e7] text-lg bg-blue-50 px-3 py-1 rounded-full">
                  {memory.year}
                </span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Travel
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;
