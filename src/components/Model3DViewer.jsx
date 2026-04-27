import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

function Model({ url, wireframe, metalness, roughness }) {
  try {
    const { scene } = useGLTF(url);
    
    useEffect(() => {
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.material) {
            child.material.wireframe = wireframe;
            child.material.metalness = metalness;
            child.material.roughness = roughness;
            child.material.needsUpdate = true;
          }
        }
      });
    }, [scene, wireframe, metalness, roughness]);

    return <primitive object={scene} scale={1.5} />;
  } catch (error) {
    console.error('Error loading model:', error);
    return null;
  }
}

function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00d4ff" wireframe />
    </mesh>
  );
}

export default function Model3DViewer({ modelUrl, modelName }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [metalness, setMetalness] = useState(0.5);
  const [roughness, setRoughness] = useState(0.5);
  
  const controlsRef = useRef();

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setAutoRotate(true);
    setWireframe(false);
    setMetalness(0.5);
    setRoughness(0.5);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (error) {
    return (
      <div className="model-viewer-error">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h3>Unable to load 3D model</h3>
          <p>The model file could not be loaded. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`model-viewer-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="model-viewer">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0a0d10');
          }}
        >
          <Suspense fallback={<LoadingBox />}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />
            <pointLight position={[0, 5, 0]} intensity={0.5} />
            
            <Model url={modelUrl} wireframe={wireframe} metalness={metalness} roughness={roughness} />
            
            <OrbitControls
              ref={controlsRef}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={10}
              autoRotate={autoRotate}
            />
          </Suspense>
        </Canvas>

        <div className="viewer-controls-bar">
          <div className="controls-left">
            <label className="toggle-switch-label">
              <div className={`toggle-switch ${autoRotate ? 'on' : ''}`} onClick={() => setAutoRotate(!autoRotate)}>
                <div className="toggle-knob"></div>
              </div>
              <RotateCcw size={14} /> Rotate
            </label>
            <label className="toggle-switch-label">
              <div className={`toggle-switch ${wireframe ? 'on' : ''}`} onClick={() => setWireframe(!wireframe)}>
                <div className="toggle-knob"></div>
              </div>
              Wireframe
            </label>
            <button className="reset-view-btn" onClick={handleReset}>
              <RotateCcw size={14} /> Reset View
            </button>
          </div>
          <div className="controls-right">
            <div className="slider-group">
              <div className="slider-label">
                <span>Metal</span>
                <span>{metalness.toFixed(2)}</span>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={metalness} onChange={e => setMetalness(parseFloat(e.target.value))} className="cyan-slider" />
            </div>
            <div className="slider-group">
              <div className="slider-label">
                <span>Rough</span>
                <span>{roughness.toFixed(2)}</span>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={roughness} onChange={e => setRoughness(parseFloat(e.target.value))} className="cyan-slider" />
            </div>
          </div>
          <button 
            className="viewer-control-btn fullscreen-btn" 
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {isFullscreen && (
        <div className="fullscreen-overlay" onClick={toggleFullscreen} />
      )}
    </div>
  );
}
