import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Builds a Gaussian-ripple surface mesh identical in spirit to Section 8/23 of the course
function SurfaceMesh() {
  const meshRef = useRef();
  const wireRef = useRef();

  const geometry = useMemo(() => {
    const size = 90;
    const segments = 90;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r = Math.sqrt(x * x + y * y);
      const z = 9 * Math.sin(r * 0.28) * Math.exp(-r * 0.028) +
                3.5 * Math.cos(x * 0.12) * Math.sin(y * 0.12);
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.06;
    }
    if (wireRef.current) {
      wireRef.current.rotation.z = t * 0.06;
    }
  });

  return (
    <group rotation={[-1.05, 0, 0.5]} position={[0, -4, 0]}>
      <mesh ref={meshRef} geometry={geometry} receiveShadow>
        <meshStandardMaterial
          color="#556B2F"
          metalness={0.15}
          roughness={0.55}
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments ref={wireRef} geometry={geometry}>
        <meshBasicMaterial attach="material" />
        <edgesGeometry attach="geometry" args={[geometry, 1]} />
        <lineBasicMaterial color="#E9EFDD" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

function FloatingPoints() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(140 * 3);
    for (let i = 0; i < 140; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 70;
      arr[i * 3 + 1] = Math.random() * 24 - 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.6} color="#8CA85E" transparent opacity={0.5} />
    </points>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 14, 46], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[20, 30, 20]} intensity={1.1} color="#F7F6F0" />
      <directionalLight position={[-20, 10, -10]} intensity={0.3} color="#556B2F" />
      <SurfaceMesh />
      <FloatingPoints />
      <fog attach="fog" args={['#F7F6F0', 40, 95]} />
    </Canvas>
  );
}
