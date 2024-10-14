import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import { useRef } from "react";
// import * as THREE from 'three';

// type RotatingCubeProps = {};


const RotatingCube = () => {
  const meshRef  = useRef<any>();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color="#468585" emissive="#9cdba6" />
      <Sparkles count={100} size={10} scale={1} color="orange" noise={0.2} speed={0.002} />
    </mesh>
  );
};

RotatingCube.displayName = 'RotatingCube';

const App = () => {
  return (
    <Canvas
      className="App"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <OrbitControls enableZoom enablePan enableRotate />
      <directionalLight position={[1, 1, 1]} intensity={10} color={'0x9cdba6'} />
      <color attach="background" args={['#F0F0F0']} />
      <RotatingCube />
    </Canvas>
  );
};

export default App;
