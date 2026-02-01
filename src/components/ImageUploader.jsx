import { useState } from 'react';
import Magnet from './Magnet';
import ShinyButton from './ShinyButton';

const ImageUploader = ({ onUpload }) => {
  const [year, setYear] = useState('2010');
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onUpload({ image: imageUrl, year });
      setHasUploaded(true);
      // Reset after a delay for visual feedback
      setTimeout(() => setHasUploaded(false), 2000);
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
        <Magnet padding={20} disabled={false} magnetStrength={5}>
          <ShinyButton
            onClick={() => document.getElementById('file-input').click()}
            className="w-full"
          >
            {hasUploaded ? '✓ Uploaded' : 'Select Photo'}
          </ShinyButton>
        </Magnet>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
