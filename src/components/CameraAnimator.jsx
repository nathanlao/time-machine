import { gsap } from 'gsap';
import { useThree } from '@react-three/fiber';

function CameraAnimator({ isActive }) {
  const { camera } = useThree();

  if (isActive) {
    gsap.to(camera, {
      fov: 40,
      duration: 7,
      ease: 'power2.inOut',
      onUpdate: () => camera.updateProjectionMatrix(),
    });
    gsap.to(camera.position, {
      x: 25,
      y: 20,
      z: 25,
      duration: 5,
      ease: 'power2.out',
    });
  }

  return null;
}

export default CameraAnimator;