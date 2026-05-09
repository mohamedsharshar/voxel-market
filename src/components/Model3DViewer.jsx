import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
  useProgress,
} from '@react-three/drei';
import {
  Aperture,
  Box,
  Maximize2,
  Minimize2,
  Mountain,
  Pause,
  Play,
  RotateCcw,
  Scan,
  Sun,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

const BACKGROUNDS = [
  { id: 'studio', label: 'Studio', color: '#090d12', icon: Aperture, environment: 'studio' },
  { id: 'graphite', label: 'Graphite', color: '#15171d', icon: Box, environment: 'city' },
  { id: 'dawn', label: 'Dawn', color: '#211b22', icon: Mountain, environment: 'sunset' },
];

function SceneBackground({ color }) {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(color);
  }, [color, gl]);
  return null;
}

function Model({ url, wireframe, metalness, roughness, animate }) {
  const groupRef = useRef();
  const { scene, animations } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        material.wireframe = wireframe;
        if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
          material.metalness = metalness;
          material.roughness = roughness;
          material.metalnessMap = null;
          material.roughnessMap = null;
          material.envMapIntensity = 1.2;
        }
        material.needsUpdate = true;
      });
    });
  }, [clonedScene, metalness, roughness, wireframe]);

  useEffect(() => {
    if (!names.length) return undefined;
    const action = actions[names[0]];
    if (animate) {
      action?.reset().fadeIn(0.25).play();
    } else {
      action?.fadeOut(0.2);
    }
    return () => action?.stop();
  }, [actions, animate, names]);

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={1.55} />
    </group>
  );
}

function LoadingBox() {
  return (
    <mesh rotation={[0.45, 0.45, 0]}>
      <boxGeometry args={[1.1, 1.1, 1.1]} />
      <meshStandardMaterial color="#35d0ff" wireframe />
    </mesh>
  );
}

export default function Model3DViewer({ modelUrl, model }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [metalness, setMetalness] = useState(0.35);
  const [roughness, setRoughness] = useState(0.55);
  const [lightIntensity, setLightIntensity] = useState(1);
  const [backgroundId, setBackgroundId] = useState('studio');
  const [animate, setAnimate] = useState(Boolean(model?.animated));
  const controlsRef = useRef();
  const { active, progress } = useProgress();
  const background = BACKGROUNDS.find((item) => item.id === backgroundId) || BACKGROUNDS[0];
  const isLoading = active && progress < 100;

  const resetView = () => {
    controlsRef.current?.reset();
    setAutoRotate(true);
    setWireframe(false);
    setMetalness(0.35);
    setRoughness(0.55);
    setLightIntensity(1);
    setBackgroundId('studio');
    setAnimate(Boolean(model?.animated));
  };

  const zoom = (direction) => {
    const controls = controlsRef.current;
    if (!controls?.object) return;
    const multiplier = direction === 'in' ? 0.82 : 1.18;
    controls.object.position.multiplyScalar(multiplier);
    controls.update();
  };

  return (
    <div className={`model-viewer-container ${isFullscreen ? 'fullscreen' : ''}`} aria-busy={isLoading}>
      <div className="model-viewer">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.9, 5], fov: 48 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <SceneBackground color={background.color} />
          <Suspense fallback={<LoadingBox />}>
            <ambientLight intensity={0.35 * lightIntensity} />
            <directionalLight position={[7, 8, 5]} intensity={1.4 * lightIntensity} castShadow />
            <directionalLight position={[-8, 3, -5]} intensity={0.45 * lightIntensity} />
            <pointLight position={[0, 4, 2]} intensity={0.35 * lightIntensity} />
            <Environment preset={background.environment} />
            <Model
              url={modelUrl}
              wireframe={wireframe}
              metalness={metalness}
              roughness={roughness}
              animate={animate}
            />
            <OrbitControls
              ref={controlsRef}
              enablePan
              enableZoom
              enableRotate
              minDistance={1.8}
              maxDistance={12}
              autoRotate={autoRotate}
              autoRotateSpeed={1.2}
            />
          </Suspense>
        </Canvas>

        {isLoading && (
          <div className="viewer-loading-overlay" role="status" aria-live="polite">
            <div className="viewer-loading-inner">
              <div className="viewer-spinner" aria-hidden />
              <div className="viewer-loading-text">Loading model - {Math.round(progress)}%</div>
            </div>
          </div>
        )}

        <div className="viewer-topbar">
          <div className="viewer-chip">
            <Scan size={14} />
            Interactive preview
          </div>
          <div className="viewer-icon-group">
            <button className="icon-button" type="button" onClick={() => zoom('in')} aria-label="Zoom in">
              <ZoomIn size={16} />
            </button>
            <button className="icon-button" type="button" onClick={() => zoom('out')} aria-label="Zoom out">
              <ZoomOut size={16} />
            </button>
            <button
              className="icon-button"
              type="button"
              onClick={() => setIsFullscreen((value) => !value)}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Open fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        <div className="viewer-side-panel">
          {model && (
            <div className="viewer-stat-grid">
              <span>
                <strong>{model.polygons.toLocaleString()}</strong>
                Polygons
              </span>
              <span>
                <strong>{model.vertices.toLocaleString()}</strong>
                Vertices
              </span>
              <span>
                <strong>{model.textures}</strong>
                Textures
              </span>
              <span>
                <strong>{model.formats.split(',')[0]}</strong>
                Primary
              </span>
            </div>
          )}
          <div className="viewer-backgrounds" aria-label="Background options">
            {BACKGROUNDS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={item.id === backgroundId ? 'active' : ''}
                  type="button"
                  onClick={() => setBackgroundId(item.id)}
                  aria-label={`Set ${item.label} background`}
                  title={item.label}
                >
                  <Icon size={15} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="viewer-controls-bar">
          <div className="controls-left">
            <button
              className={`viewer-toggle ${autoRotate ? 'active' : ''}`}
              type="button"
              onClick={() => setAutoRotate((value) => !value)}
              aria-pressed={autoRotate}
            >
              <RotateCcw size={14} /> Auto
            </button>
            <button
              className={`viewer-toggle ${wireframe ? 'active' : ''}`}
              type="button"
              onClick={() => setWireframe((value) => !value)}
              aria-pressed={wireframe}
            >
              <Box size={14} /> Wire
            </button>
            <button
              className={`viewer-toggle ${animate ? 'active' : ''}`}
              type="button"
              onClick={() => setAnimate((value) => !value)}
              aria-pressed={animate}
            >
              {animate ? <Pause size={14} /> : <Play size={14} />} Anim
            </button>
            <button className="viewer-toggle" type="button" onClick={resetView}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="controls-right">
            <label className="slider-group">
              <span>
                <Sun size={13} /> Light
              </span>
              <input
                className="cyan-slider"
                type="range"
                min="0.35"
                max="1.8"
                step="0.05"
                value={lightIntensity}
                onChange={(event) => setLightIntensity(Number(event.target.value))}
              />
            </label>
            <label className="slider-group">
              <span>Metal</span>
              <input
                className="cyan-slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={metalness}
                onChange={(event) => setMetalness(Number(event.target.value))}
              />
            </label>
            <label className="slider-group">
              <span>Rough</span>
              <input
                className="cyan-slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={roughness}
                onChange={(event) => setRoughness(Number(event.target.value))}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
