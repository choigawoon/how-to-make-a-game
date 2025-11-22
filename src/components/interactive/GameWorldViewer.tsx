import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import type { GameEntitySample } from '@/types/course'

interface GameWorldViewerProps {
  entities: GameEntitySample[]
  selectedEntityId: number | null
  onSelectEntity: (id: number | null) => void
}

// Single entity mesh
function Entity({
  entity,
  isSelected,
  onClick,
}: {
  entity: GameEntitySample
  isSelected: boolean
  onClick: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Animate selected entity
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2
    }
  })

  // Color based on health
  const healthColor = useMemo(() => {
    const health = entity.health / 100
    return new THREE.Color().setHSL(health * 0.3, 0.8, 0.5)
  }, [entity.health])

  // Size based on stats
  const size = useMemo(() => {
    const totalStats = entity.stats.strength + entity.stats.agility + entity.stats.intelligence
    return 0.3 + (totalStats / 300) * 0.5
  }, [entity.stats])

  // Scale position to fit in view (original is 0-1000)
  const scaledPosition: [number, number, number] = [
    (entity.position.x / 1000) * 20 - 10,
    entity.position.y / 100,
    (entity.position.z / 1000) * 20 - 10,
  ]

  return (
    <group position={scaledPosition}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        castShadow
      >
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={healthColor}
          emissive={isSelected ? '#ffffff' : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>

      {/* Entity label */}
      {isSelected && (
        <Html position={[0, size + 0.3, 0]} center>
          <div className="bg-slate-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            <div className="font-bold">{entity.name}</div>
            <div>HP: {entity.health}</div>
            <div>Items: {entity.inventory.length}</div>
          </div>
        </Html>
      )}

      {/* Health bar */}
      <mesh position={[0, size / 2 + 0.15, 0]}>
        <boxGeometry args={[size, 0.05, 0.05]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
      <mesh position={[(entity.health / 100 - 0.5) * size * 0.5, size / 2 + 0.15, 0]}>
        <boxGeometry args={[size * (entity.health / 100), 0.05, 0.06]} />
        <meshBasicMaterial color={healthColor} />
      </mesh>

      {/* Buff indicators */}
      {entity.buffs.map((buff, i) => (
        <mesh
          key={buff.id}
          position={[
            Math.cos((i / entity.buffs.length) * Math.PI * 2) * (size * 0.8),
            0.1,
            Math.sin((i / entity.buffs.length) * Math.PI * 2) * (size * 0.8),
          ]}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      ))}
    </group>
  )
}

// Main 3D scene
function Scene({
  entities,
  selectedEntityId,
  onSelectEntity,
}: GameWorldViewerProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />

      {/* Ground grid */}
      <Grid
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#334155"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#475569"
        fadeDistance={50}
        infiniteGrid
      />

      {/* World bounds indicator */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14, 14.1, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>

      {/* Entities */}
      {entities.map((entity) => (
        <Entity
          key={entity.id}
          entity={entity}
          isSelected={selectedEntityId === entity.id}
          onClick={() => onSelectEntity(entity.id)}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        makeDefault
        minDistance={5}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.1}
      />

      {/* Axis labels */}
      <Text position={[12, 0.5, 0]} fontSize={0.5} color="#ef4444">
        X
      </Text>
      <Text position={[0, 0.5, 12]} fontSize={0.5} color="#3b82f6">
        Z
      </Text>
    </>
  )
}

export function GameWorldViewer({
  entities,
  selectedEntityId,
  onSelectEntity,
}: GameWorldViewerProps) {
  return (
    <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [15, 15, 15], fov: 50 }}
        onClick={() => onSelectEntity(null)}
      >
        <Scene
          entities={entities}
          selectedEntityId={selectedEntityId}
          onSelectEntity={onSelectEntity}
        />
      </Canvas>
    </div>
  )
}
