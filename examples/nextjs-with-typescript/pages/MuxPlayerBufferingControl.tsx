import React, { useRef, useEffect, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import MuxPlayerElement from '@mux/mux-player';

const BufferingControlExample: React.FC = () => {
  const playerRef = useRef<MuxPlayerElement>(null);
  const [isBuffering, setIsBuffering] = useState<boolean | undefined>(undefined);

  const handleStartBuffering = () => {
    playerRef.current?.startBuffering();
    updateBufferingStatus();
  };

  const handleStopBuffering = () => {
    playerRef.current?.stopBuffering();
    updateBufferingStatus();
  };

  const updateBufferingStatus = () => {
    if (playerRef.current) {
      const buffering = playerRef.current.isBuffering();
      setIsBuffering(buffering);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (typeof playerRef.current?.isBuffering === "function") {
        updateBufferingStatus();
        clearInterval(intervalId);
      }
    }, 400);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Mux Player React - Buffering Control Example</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <MuxPlayer
          ref={playerRef}
          playbackId="ihZa7qP1zY8oyLSQW9TS602VgwQvNdyIvlk9LInEGU2s"
          muted
          preload="auto"
          autoPlay={true}
          preferPlayback='mse'
          style={{ width: '100%', height: '400px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '20px 0', flexWrap: 'wrap' }}>
        <button
          onClick={handleStartBuffering}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Start Buffering
        </button>
        
        <button
          onClick={handleStopBuffering}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#f44336',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Stop Buffering
        </button>
        
        <button
          onClick={updateBufferingStatus}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#2196F3',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Check Status
        </button>
      </div>

      <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '4px', margin: '20px 0' }}>
        <h3>Current Status:</h3>
        { (isBuffering !== undefined) && <p>
          Buffering: <span style={{ fontWeight: 'bold', color: isBuffering ? '#4CAF50' : '#f44336' }}>
            {isBuffering ? 'Yes' : 'No'}
          </span>
        </p> }
        { (isBuffering === undefined) && <p>
          Stop/Start buffering is not supported natively. Make sure you are using Hls.js to playback content.
        </p> }
      </div>
    </div>
  );
};

export default BufferingControlExample;
