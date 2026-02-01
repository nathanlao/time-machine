import { useState, useRef } from 'react';
import Magnet from './Magnet';
import ShinyButton from './ShinyButton';
import { motion } from 'framer-motion';

const ImageUploader = ({ onUpload }) => {
  const [year, setYear] = useState('2010');
  const [hasUploaded, setHasUploaded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newMemories = [];
      for (let file of files) {
        const imageUrl = URL.createObjectURL(file);
        newMemories.push({ image: imageUrl, year });
      }
      onUpload(newMemories);
      setHasUploaded(true);
      if (!hasShownAlert) {
        setShowMessage(true);
        setHasShownAlert(true);
      }
      // Reset after a delay for visual feedback
      setTimeout(() => {
        setHasUploaded(false);
        setShowMessage(false);
      }, 8000);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 relative max-w-[200px] mx-auto">
        <label className="block text-[#0096e7] font-bold mb-2 text-center uppercase tracking-wider text-xs">
          Target Year
        </label>
        <div className="relative group">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className="w-full px-4 py-2 text-center text-xl font-bold text-gray-700 bg-white border-4 border-[#0096e7] rounded-2xl focus:outline-none focus:border-[#d91e18] focus:shadow-[0_4px_0_rgba(0,0,0,0.1)] transition-all placeholder-gray-300 shadow-[0_4px_0_#0078b9]"
          />
          <div className="absolute -right-3 -top-3 text-xl transform rotate-12 group-hover:rotate-45 transition-transform cursor-default">
            🕰️
          </div>
        </div>
      </div>
      <div className="text-center">
        <Magnet padding={50} disabled={false} magnetStrength={6}>
          <ShinyButton
            onClick={() => document.getElementById('file-input').click()}
            className="w-full"
          >
            {hasUploaded ? '✓ Uploaded' : 'Select Photos'}
          </ShinyButton>
        </Magnet>
        <input
          ref={fileInputRef}
          id="file-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.5, rotate: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            boxShadow: [
              '0 0 0 rgba(255, 0, 0, 0)',
              '0 0 30px rgba(255, 0, 0, 0.8)',
              '0 0 0 rgba(0, 150, 231, 0)',
            ],
          }}
          exit={{ opacity: 0, y: -20, scale: 0.8, rotate: 10 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            boxShadow: { duration: 1.5, times: [0, 0.5, 1] },
          }}
          className="mt-6 p-4 bg-gradient-to-r from-red-500 to-[#0096e7] text-white rounded-lg shadow-lg text-center border-2 border-yellow-400"
        >
          <motion.div
            animate={{ x: [0, -5, 5, -5, 5, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-bold text-xl">⚠️ ALERT!</p>
          </motion.div>
          <motion.p
            className="font-semibold text-lg mt-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            🚀 Photos uploaded successfully!
          </motion.p>
          <motion.p
            className="text-sm mt-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            Click the 3D time machine to start your journey through time!
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUploader;
