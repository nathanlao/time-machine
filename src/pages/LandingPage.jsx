import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Center, CameraControls, PerspectiveCamera } from '@react-three/drei';
import RotatingTimeMachine from '../components/RotatingTimeMachine.jsx';

function LandingPage() {
  return (
    <>
      <title>GLB Model</title>
      <main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
        <Canvas style={{ width: '100%', height: '100%' }}>
          <PerspectiveCamera makeDefault fov={10} position={[50, 30, 50]} />
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
            <Center>
              <RotatingTimeMachine />
            </Center>
          </Suspense>
        </Canvas>
      </main>
    </>
  );
}
export default LandingPage;
