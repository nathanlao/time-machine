import { useState, useRef } from 'react';
import Magnet from '../Magnet';
import ShinyButton from '../ShinyButton';
import { motion } from 'framer-motion';

const ImageUploader = ({ onUpload }) => {
  const [year, setYear] = useState('2010');
  const [hasUploaded, setHasUploaded] = useState(false);
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
      // Reset after a delay for visual feedback
      setTimeout(() => {
        setHasUploaded(false);
      }, 8000);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 relative max-w-[200px] mx-auto">
        <label className="block text-[#FFDE21] font-bold mb-2 text-center tracking-wider text-md">
          Enter Year
        </label>
        <div className="group">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className="w-full px-4 py-2 text-center text-xl font-bold text-white rounded-[18px] focus:outline-none focus:scale-105 transition-all placeholder-white/50"
            style={{
              background: `
                linear-gradient(180deg, 
                  #3a9fd8 0%, 
                  #2986CC 30%, 
                  #1e6ba8 70%, 
                  #154d7a 100%
                )
              `,
              border: '2px solid rgba(100, 200, 255, 0.5)',
              boxShadow: `
                inset 0 3px 8px rgba(255,255,255,0.4),
                inset 0 -4px 8px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.6),
                0 0 10px rgba(41,134,204,0.6),
                0 0 20px rgba(0,200,255,0.3),
                0 0 30px rgba(100,180,255,0.2),
                0 8px 25px rgba(0,0,0,0.4),
                0 15px 35px rgba(0,50,100,0.3)
              `,
              transform: 'perspective(500px) rotateX(5deg)',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>
      <div className="text-center">
        <Magnet padding={50} disabled={false} magnetStrength={6}>
          <ShinyButton
            onClick={() => document.getElementById('file-input').click()}
            className="w-full"
          >
            {hasUploaded ? 'Loaded' : 'Load Memories'}
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
    </div>
  );
};

export default ImageUploader;
