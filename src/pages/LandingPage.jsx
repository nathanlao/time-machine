import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Center, CameraControls, PerspectiveCamera } from '@react-three/drei';
import RotatingTimeMachine from '../components/RotatingTimeMachine.jsx';
import ImageUploader from '../components/ImageUploader.jsx';
import Galaxy from '../components/Galaxy/Galaxy.jsx';

function LandingPage({ onUpload }) {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-between relative bg-black">
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
          <Suspense>
            <Center position={[5, 2, 0]}>
              <RotatingTimeMachine />
            </Center>
          </Suspense>
        </Canvas>
      </div>

      {/* Button for image upload */}
      <div className="w-full md:w-1/3 flex justify-center items-center p-8 z-20 relative">
        <ImageUploader onUpload={onUpload} />
      </div>
    </div>
  );
}

export default LandingPage;
