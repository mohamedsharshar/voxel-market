import React from 'react';
import { UploadCloud } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function UploadDropzone() {
  const { showToast } = useApp();
  const [dragging, setDragging] = React.useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const count = event.dataTransfer.files?.length || 0;
    showToast(count ? `${count} file${count > 1 ? 's' : ''} queued for review` : 'Drop model files here', count ? 'success' : 'info');
  };

  return (
    <div
      className={`upload-dropzone ${dragging ? 'is-dragging' : ''}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label="Upload 3D model files"
    >
      <UploadCloud size={30} />
      <div>
        <strong>Drop GLB, FBX, OBJ, textures, or preview renders</strong>
        <span>Files are validated for format, scale, texture maps, and licensing notes.</span>
      </div>
    </div>
  );
}
