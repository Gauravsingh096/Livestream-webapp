import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import Overlay from './Overlay';
import { getOverlays, deleteOverlay } from '../api';
import '../styles.css';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  // HLS video stream
  const [hlsUrl, setHlsUrl] = useState('http://localhost:5000/hls/output.m3u8'); 
  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported() && video) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((error) => console.error('Video playback error:', error));
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
      });

      return () => {
        hls.destroy(); 
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((error) => console.error('Video playback error:', error));
      });
    }
  }, [hlsUrl]);

  // Fetch all overlays on load
  useEffect(() => {
    const fetchOverlays = async () => {
      try {
        const response = await getOverlays();
        setOverlays(response.data);
      } catch (error) {
        console.error('Error fetching overlays:', error);
      }
    };

    fetchOverlays();
  }, []);

  // Function to delete an overlay
  const handleDeleteOverlay = async (id) => {
    try {
      await deleteOverlay(id);
      setOverlays(overlays.filter((overlay) => overlay._id !== id));
    } catch (error) {
      console.error('Error deleting overlay:', error);
    }
  };

  // Function to add new overlay 
  const handleSaveOverlay = (newOverlay) => {
    setOverlays([...overlays, newOverlay]);
  };

  // Function to handle stream change
  const handleStreamChange = (newUrl) => {
    setHlsUrl(newUrl);
  };

  return (
    <div className="video-container">
      <video ref={videoRef} controls />
      <div className="stream-controls">
        <button onClick={() => handleStreamChange('http://localhost:5000/hls/output.m3u8')}>Press Play button in Video</button>
      </div>

      {/* Render all overlays */}
      {overlays.map((overlay) => (
        <Overlay
          key={overlay._id}
          overlay={overlay}
          onDelete={() => handleDeleteOverlay(overlay._id)}
          onSave={handleSaveOverlay}
        />
      ))}
    </div>
  );
};

export default VideoPlayer;
