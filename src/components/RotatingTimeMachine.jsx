import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TimeMachine } from './3dModel/Time_machine';

function RotatingTimeMachine({ onClick, isClickable }) {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2;
  });

  return <TimeMachine ref={ref} onClick={onClick} isClickable={isClickable} />;
}

export default RotatingTimeMachine;
