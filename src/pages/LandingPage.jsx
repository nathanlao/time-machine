import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Center, CameraControls, PerspectiveCamera } from '@react-three/drei';
import RotatingTimeMachine from '../components/RotatingTimeMachine.jsx';
import ImageUploader from '../components/ImageUploader.jsx';

function LandingPage({ onUpload }) {
  return (
    <div className="w-full h-[600px] flex flex-col md:flex-row items-center justify-between">
      {/* 3D Model */}
      <div className="w-full md:w-2/3 h-full relative">
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
      <div className="w-full md:w-1/3 flex justify-center items-center p-8 z-10">
        <ImageUploader onUpload={onUpload} />
      </div>
    </div>
  );
}

export default LandingPage;
