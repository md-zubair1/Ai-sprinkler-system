import { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Cylinder, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { Badge } from "@/components/ui/badge";

interface SprinklerStand {
  id: string;
  name: string;
  position: [number, number, number];
  status: 'online' | 'offline' | 'maintenance' | 'active';
  zone: string;
}

interface InfectedZone {
  position: [number, number];
  size: [number, number];
  severity: number; // 0-1
}

const sprinklerStands: SprinklerStand[] = [
  { id: 'S001', name: 'Alpha-1', position: [-15, 0.5, -10], status: 'active', zone: 'A-1' },
  { id: 'S002', name: 'Beta-2', position: [5, 0.5, -15], status: 'online', zone: 'B-2' },
  { id: 'S003', name: 'Gamma-3', position: [15, 0.5, 5], status: 'maintenance', zone: 'C-1' },
  { id: 'S004', name: 'Delta-4', position: [-8, 0.5, 12], status: 'active', zone: 'A-3' },
  { id: 'S005', name: 'Echo-5', position: [12, 0.5, -8], status: 'online', zone: 'B-1' },
  { id: 'S006', name: 'Foxtrot-6', position: [-5, 0.5, 18], status: 'offline', zone: 'C-2' },
];

const infectedZones: InfectedZone[] = [
  { position: [8, -12], size: [6, 4], severity: 0.8 },
  { position: [-12, 8], size: [4, 3], severity: 0.6 },
  { position: [15, 10], size: [3, 2], severity: 0.4 },
];

const SprinklerStandMarker = ({ stand }: { stand: SprinklerStand }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22c55e'; // success green
      case 'online': return '#3b82f6'; // primary blue
      case 'maintenance': return '#f59e0b'; // warning yellow
      case 'offline': return '#ef4444'; // destructive red
      default: return '#6b7280'; // muted gray
    }
  };

  const isActive = stand.status === 'active';

  return (
    <group position={stand.position}>
      {/* Stand Base */}
      <Cylinder
        ref={meshRef}
        args={[0.3, 0.4, 0.8]}
        position={[0, 0.4, 0]}
      >
        <meshLambertMaterial color={getStatusColor(stand.status)} />
      </Cylinder>
      
      {/* Spray Arms */}
      <group position={[0, 0.8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <Box args={[2, 0.1, 0.1]} position={[0, 0, 0]}>
          <meshLambertMaterial color="#374151" />
        </Box>
        <Box args={[0.1, 0.1, 2]} position={[0, 0, 0]}>
          <meshLambertMaterial color="#374151" />
        </Box>
      </group>

      {/* Active spray effect */}
      {isActive && (
        <group position={[0, 1, 0]}>
          {[...Array(8)].map((_, i) => (
            <Box
              key={i}
              args={[0.05, 0.1, 0.05]}
              position={[
                Math.cos((i * Math.PI) / 4) * 1.5,
                -0.5,
                Math.sin((i * Math.PI) / 4) * 1.5
              ]}
            >
              <meshLambertMaterial color="#60a5fa" transparent opacity={0.6} />
            </Box>
          ))}
        </group>
      )}

      {/* Label */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
      >
        {stand.name}
      </Text>
    </group>
  );
};

const CropField = () => {
  const cropRows = useMemo(() => {
    const rows = [];
    for (let x = -20; x <= 20; x += 2) {
      for (let z = -20; z <= 20; z += 1) {
        // Check if this area is infected
        let isInfected = false;
        let severity = 0;
        
        for (const zone of infectedZones) {
          const dx = x - zone.position[0];
          const dz = z - zone.position[1];
          if (
            Math.abs(dx) < zone.size[0] / 2 &&
            Math.abs(dz) < zone.size[1] / 2
          ) {
            isInfected = true;
            severity = zone.severity;
            break;
          }
        }

        rows.push({
          position: [x, 0, z] as [number, number, number],
          isInfected,
          severity,
        });
      }
    }
    return rows;
  }, []);

  return (
    <group>
      {cropRows.map((row, index) => {
        const healthyGreen = '#22c55e';
        const infectedColor = row.severity > 0.7 ? '#ef4444' : 
                            row.severity > 0.4 ? '#f59e0b' : '#fbbf24';
        
        return (
          <Box
            key={index}
            args={[1.8, 0.3, 0.8]}
            position={row.position}
          >
            <meshLambertMaterial 
              color={row.isInfected ? infectedColor : healthyGreen}
            />
          </Box>
        );
      })}
    </group>
  );
};

const Field3D = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-200 to-green-100 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [25, 15, 25], fov: 60 }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 20, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
        />

        {/* Ground */}
        <Plane
          args={[50, 50]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.1, 0]}
          receiveShadow
        >
          <meshLambertMaterial color="#8b5a2b" />
        </Plane>

        {/* Crop Field */}
        <CropField />

        {/* Sprinkler Stands */}
        {sprinklerStands.map((stand) => (
          <SprinklerStandMarker key={stand.id} stand={stand} />
        ))}

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={50}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Legend Overlay */}
      <div className="absolute top-4 left-4 space-y-2 bg-background/80 backdrop-blur-sm p-3 rounded-lg">
        <div className="text-sm font-medium mb-2">Field Status</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-success rounded-sm" />
          <span className="text-xs">Healthy Crops</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-warning rounded-sm" />
          <span className="text-xs">Low Infection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-destructive rounded-sm" />
          <span className="text-xs">High Infection</span>
        </div>
      </div>

      {/* Stand Status Legend */}
      <div className="absolute top-4 right-4 space-y-2 bg-background/80 backdrop-blur-sm p-3 rounded-lg">
        <div className="text-sm font-medium mb-2">Stand Status</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-success rounded-full" />
          <span className="text-xs">Active Spraying</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full" />
          <span className="text-xs">Online</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-warning rounded-full" />
          <span className="text-xs">Maintenance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-destructive rounded-full" />
          <span className="text-xs">Offline</span>
        </div>
      </div>

      {/* Controls Help */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
        Click & drag to rotate • Scroll to zoom • Right-click to pan
      </div>
    </div>
  );
};

export default Field3D;