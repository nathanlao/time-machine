import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TimeMachine } from './3dModel/Time_machine';

function RotatingTimeMachine() {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2;
  });

  return <TimeMachine ref={ref} />;
}

export default RotatingTimeMachine;
