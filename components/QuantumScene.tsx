
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo, useEffect, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

// --- NEURAL NETWORK SCENE (New Hero Background) ---

// Define the particle structure
interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
  offset: number;
  size: number;
}

interface NeuronProps {
  particle: ParticleData;
}

const Neuron: React.FC<NeuronProps> = ({ particle }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Set initial position immediately to avoid frame jump
  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(particle.position);
    }
  }, [particle]);

  useFrame((state) => {
    if (meshRef.current) {
      // Sync mesh position with the mutable particle position from the parent
      meshRef.current.position.copy(particle.position);

      const t = state.clock.getElapsedTime();
      // Pulse effect
      const scale = 1 + Math.sin(t * 3 + particle.offset) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Increased size from 0.06 to dynamic particle.size which is larger */}
      <sphereGeometry args={[particle.size, 32, 32]} />
      <meshStandardMaterial 
        color={particle.color} 
        emissive={particle.color} 
        emissiveIntensity={0.4} 
        roughness={0.2} 
        metalness={0.5} 
      />
    </mesh>
  );
};

const SynapticWeb = () => {
  const count = 60; // Slightly increased count
  const connectionDistance = 4.0;
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Use useRef for particles to ensure they are mutable and stable across renders
  const particlesRef = useRef<ParticleData[]>([]);

  // Initialize particles once
  if (particlesRef.current.length === 0) {
    // Lesbian Pride Flag inspired palette (Soft/Pastel)
    // Dark Orange, Light Orange, White, Light Pink, Dark Pink/Rose
    const palette = [
        '#F0A58E', // Soft Terracotta/Orange
        '#F8C8B5', // Pale Peach
        '#FFFFFF', // White
        '#F3BAD1', // Light Pink
        '#D9728E', // Deep Rose/Pink
    ];

    particlesRef.current = new Array(count).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 7
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015
      ),
      color: palette[Math.floor(Math.random() * palette.length)],
      offset: Math.random() * 10,
      // Larger size range: 0.1 to 0.22 (was fixed 0.06)
      size: Math.random() * 0.12 + 0.1 
    }));
  }

  const particles = particlesRef.current;

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
    return geo;
  }, []);
  
  useEffect(() => {
    return () => {
      linesGeometry.dispose();
    };
  }, [linesGeometry]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.03;
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.03;
    }

    particles.forEach(p => {
      p.position.add(p.velocity);
      p.position.y += Math.sin(t + p.position.x) * 0.002;

      if (Math.abs(p.position.x) > 7) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > 4) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > 5) p.velocity.z *= -1;
    });

    if (linesRef.current) {
      const positions: number[] = [];
      
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dist = particles[i].position.distanceTo(particles[j].position);
          
          if (dist < connectionDistance) {
            positions.push(
              particles[i].position.x, particles[i].position.y, particles[i].position.z,
              particles[j].position.x, particles[j].position.y, particles[j].position.z
            );
          }
        }
      }
      
      linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      linesGeometry.computeBoundingSphere(); 
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Neuron key={i} particle={p} />
      ))}
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        {/* Soft pinkish/peach line color */}
        <lineBasicMaterial color="#F3BAD1" transparent opacity={0.15} linewidth={1} />
      </lineSegments>
    </group>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        {/* Warm Orange Light */}
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#F0A58E" />
        {/* Soft Pink Light */}
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#D9728E" />
        
        <SynapticWeb />

        <Environment preset="sunset" />
        {/* Pink/Rose tinted stars */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

// --- QUANTUM COMPUTER SCENE ---
export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={1} />
        {/* Updated SpotLight color to Deep Rose */}
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#D9728E" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#F8C8B5"/>
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.4} floatIntensity={0.2} speed={1}>
          <group rotation={[0, 0, 0]} position={[0, 0.5, 0]}>
            {/* Main Cryostat Structure (Updated Materials to Rose Gold/Copper) */}
            
            {/* Top Plate */}
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[1.2, 1.2, 0.1, 64]} />
              <meshStandardMaterial color="#D9728E" metalness={0.9} roughness={0.15} />
            </mesh>
            
            {/* Middle Stage */}
            <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[1, 1, 0.1, 64]} />
                <meshStandardMaterial color="#D9728E" metalness={0.9} roughness={0.15} />
            </mesh>
            
            {/* Bottom Stage (Mixing Chamber) */}
            <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.1, 64]} />
                <meshStandardMaterial color="#D9728E" metalness={0.9} roughness={0.15} />
            </mesh>

            {/* Connecting Rods - Silver */}
            <mesh position={[0.5, 0.6, 0]}>
               <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
               <meshStandardMaterial color="#E5E7EB" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.5, 0.6, 0]}>
               <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
               <meshStandardMaterial color="#E5E7EB" metalness={0.8} roughness={0.2} />
            </mesh>
             <mesh position={[0, 0.6, 0.5]}>
               <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
               <meshStandardMaterial color="#E5E7EB" metalness={0.8} roughness={0.2} />
            </mesh>
             <mesh position={[0, 0.6, -0.5]}>
               <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
               <meshStandardMaterial color="#E5E7EB" metalness={0.8} roughness={0.2} />
            </mesh>

             {/* Lower Rods */}
             <mesh position={[0.2, -0.2, 0]}>
               <cylinderGeometry args={[0.03, 0.03, 0.8, 16]} />
               <meshStandardMaterial color="#E5E7EB" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.2, -0.2, 0]}>
               <cylinderGeometry args={[0.03, 0.03, 0.8, 16]} />
               <meshStandardMaterial color="#E5E7EB" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Coils/Wires - Copper/Pink */}
            <mesh position={[0, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
               <torusGeometry args={[0.7, 0.015, 16, 64]} />
               <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.3} />
            </mesh>
             <mesh position={[0, -1, 0]} rotation={[Math.PI/2, 0, 0]}>
               <torusGeometry args={[0.3, 0.015, 16, 64]} />
               <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.3} />
            </mesh>
            
            {/* Central processor chip simulation at bottom */}
            <mesh position={[0, -0.7, 0]}>
                <boxGeometry args={[0.2, 0.05, 0.2]} />
                <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
