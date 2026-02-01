import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { TimeMachine } from './3dModel/Time_machine';
import { gsap } from 'gsap';

function RotatingTimeMachine({ onMachineClick }) {
  const ref = useRef();
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    if (!ref.current || isClicked) return;
    ref.current.rotation.y += delta * 0.2;
  });

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    if (!ref.current) return;

    // Store original scale and position
    const origScale = ref.current.scale.clone();
    const origPos = ref.current.position.clone();
    const origRotX = ref.current.rotation.x;
    const origRotY = ref.current.rotation.y;
    const origRotZ = ref.current.rotation.z;

    // Animate machine: shrink and move up
    gsap.to(ref.current.scale, {
      x: origScale.x * 0.5,
      y: origScale.y * 0.5,
      z: origScale.z * 0.5,
      duration: 3,
      ease: 'power1.inOut',
    });

    gsap.to(ref.current.position, {
      x: origPos.x + 20,
      y: origPos.y + 6,
      duration: 5,
      ease: 'power1.inOut',
    });

    // Rotate to show side profile (rotate around x-axis to tilt the view)
    gsap.to(ref.current.rotation, {
      x: origRotX + Math.PI / 20,
      y: 3.7,
      z: origRotZ,
      duration: 4,
      ease: 'power3.inOut',
    });

    if (onMachineClick) {
      onMachineClick();
    }
  };

  return <TimeMachine ref={ref} onPointerDown={handleClick} />;
}

export default RotatingTimeMachine;
