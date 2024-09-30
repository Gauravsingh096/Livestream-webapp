import React, { useState, useEffect } from 'react';
import { getOverlays, deleteOverlay } from './api.js';
import Overlay from './components/Overlay.js';
import VideoPlayer from './components/VideoPlayer'; 

const App = () => {
  const [overlays, setOverlays] = useState([]);
  const [selectedOverlayId, setSelectedOverlayId] = useState(null);

  useEffect(() => {
    // Fetch overlays from the API
    const fetchOverlays = async () => {
      const response = await getOverlays();
      setOverlays(response.data);
    };

    fetchOverlays();
  }, []);

  const handleSaveOverlay = (overlayData) => {
    // Logic to update the overlay
    setOverlays((prev) => [...prev, overlayData]);
  };

  const handleDeleteOverlay = async (id) => {
    try {
      await deleteOverlay(id);
      setOverlays((prev) => prev.filter((overlay) => overlay._id !== id));
    } catch (error) {
      console.error('Error deleting overlay:', error);
    }
  };

  const handleOverlayClick = (id) => {
    setSelectedOverlayId(id); 
  };

  return (
    <div className="App">
      <VideoPlayer rtspUrl="http://localhost:5000/hls/output.m3u8" />
      
      {/*creating a new overlay */}
      <Overlay onSave={handleSaveOverlay} />
      
      {/* List of existing overlays */}
      {overlays.map((overlay) => (
        <Overlay
          key={overlay._id}
          overlay={overlay}
          selectedOverlayId={selectedOverlayId}
          onClick={handleOverlayClick} 
          onDelete={() => handleDeleteOverlay(overlay._id)} 
          onSave={handleSaveOverlay} 
        />
      ))}
    </div>
  );
};

export default App;

