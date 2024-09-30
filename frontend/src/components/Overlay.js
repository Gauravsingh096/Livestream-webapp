import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import axios from 'axios';

const Overlay = ({ overlay, selectedOverlayId, onClick, onDelete, onSave }) => {
  const [text, setText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (overlay) {
      setText(overlay.text || '');
      setPosition(overlay.position || { x: 0, y: 0 });
    }
  }, [overlay]);

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleSave = async () => {
    if (!text.trim()) {
      alert("Please enter overlay text.");
      return;
    }

    const overlayData = {
      text,
      position
    };

    try {
      let response;
      if (overlay && overlay._id) {
        // Update existing overlay
        response = await axios.put(`http://localhost:5000/api/overlay/${overlay._id}`, overlayData);
      } else {
        // Create a new overlay
        response = await axios.post('http://localhost:5000/api/overlay', overlayData);
      }

      console.log('Overlay saved:', response.data);
      onSave(response.data);
    } catch (error) {
      console.error('Error saving overlay:', error);
      alert("Failed to save overlay. Please ensure all fields are filled correctly.");
    }

    setText('');
    setPosition({ x: 100, y: 100 });
  };

  return (
    <Draggable position={position} onDrag={handleDrag}>
      <div
        className="overlay"
        style={{
          position: 'absolute',
          cursor: 'move',
          padding: '8px',
          border: '1px solid black',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          maxWidth: '200px',
        }}
        onClick={() => onClick && onClick(overlay?._id)} 
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter overlay text"
          style={{ width: '100%', marginBottom: '8px' }}
        />
        {selectedOverlayId === overlay?._id && (
          <div>
            <button onClick={handleSave}>Save Overlay</button>
            <button onClick={onDelete}>Delete Overlay</button>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Overlay;
