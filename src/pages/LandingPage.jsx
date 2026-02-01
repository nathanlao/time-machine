import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Center, CameraControls, PerspectiveCamera } from '@react-three/drei';
import RotatingTimeMachine from '../components/RotatingTimeMachine.jsx';
import ImageUploader from '../components/ImageUploader/ImageUploader.jsx';
import Galaxy from '../components/Galaxy/Galaxy.jsx';
import CameraAnimator from '../components/CameraAnimator.jsx';
import { motion } from 'framer-motion';

function LandingPage({
  onUpload,
  onTimeMachineClick,
  isClickable,
  cameraAnimating,
}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);

  const handleTimeMachineClick = () => {
    onTimeMachineClick();
    setShowInstruction(false);
  };

  const handleUpload = (memories) => {
    onUpload(memories);
    setShowSuccess(true);
    setShowInstruction(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-between relative bg-gradient-to-b from-slate-950 via-teal-950 to-slate-950">
      {/* Alerts */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-4">
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#00d4ff]/50 text-white px-6 py-3 rounded-lg shadow-lg text-center font-bold text-lg"
          >
            ✅ Memories Loaded Successfully!
          </motion.div>
        )}
        {showInstruction && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.2,
            }}
            className=" text-white px-6 py-3 rounded-lg shadow-lg text-center font-semibold text-2xl"
          >
            Use the Time Machine to start traveling!
          </motion.div>
        )}
      </div>
      <div className="absolute inset-0 z-0">
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={false}
          density={1}
          glowIntensity={0.15}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.9}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.7}
          speed={1}
        />
      </div>
      {/* 3D Model */}
      <div className="w-full md:w-2/3 h-full relative z-10">
        <Canvas style={{ width: '100%', height: '100%' }}>
          <PerspectiveCamera makeDefault fov={9} position={[50, 30, 50]} />
          <CameraControls
            autoRotate={true}
            autoRotateSpeed={2}
            enableZoom={true}
          />
          <hemisphereLight
            skyColor={0xffffff}
            groundColor={0x444444}
            intensity={1.5}
          />
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <CameraAnimator isActive={cameraAnimating} />
          <Suspense>
            <Center position={[5, 2, 0]}>
              <RotatingTimeMachine
                onClick={handleTimeMachineClick}
                isClickable={isClickable}
              />
            </Center>
          </Suspense>
        </Canvas>
      </div>
      {/* Button for image upload */}
      <div className="w-full md:w-1/3 flex justify-center items-center p-8 z-20 relative">
        <ImageUploader onUpload={handleUpload} />
      </div>
    </div>
  );
}

export default LandingPage;
