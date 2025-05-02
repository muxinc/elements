import React, { useEffect, useState } from 'react';
import { VideoItem, PlaylistVideos } from './playlist';
import style from './end-screen.css';

interface PlaylistEndScreenProps {
  video: VideoItem;
  relatedVideos: PlaylistVideos;
  isVisible: boolean;
  selectVideoCallback: (index: number) => void;
  timerCallback: () => void;
}

const PlaylistEndScreen = ({
  video,
  relatedVideos,
  isVisible,
  selectVideoCallback,
  timerCallback,
}: PlaylistEndScreenProps) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!isVisible) {
      setCount(3);
      return;
    }

    if (count < 0) {
      timerCallback();
      return;
    }
    const timer = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, -1));
    }, 1000);

    return () => clearInterval(timer);
  }, [count, isVisible]);

  return (
    <>
      <style>{style}</style>
      <div className="playlist" style={{ display: isVisible ? 'grid' : 'none' }}>
        <div className="overlay" style={{ display: isVisible ? 'grid' : 'none' }} />
        <div className="post-video-section" style={{ display: isVisible ? 'grid' : 'none', zIndex: 99 }}>
          <div className="video-section">
            <div className="video-container">
              <h2 className="title">Video</h2>
              <div className="video-wrapper">
                <img className="video-thumbnail" src={video.imageUrl} alt={video.title} />
                <div className="countdown-overlay">
                  <svg className="countdown-ring" width="50" height="50">
                    <circle cx="25" cy="25" r="22" className="circle-background" />
                    <circle
                      cx="25"
                      cy="25"
                      r="22"
                      className="circle-progress"
                      style={{
                        strokeDasharray: '138',
                        strokeDashoffset: `${(count / 3) * 138}`,
                      }}
                    />
                  </svg>
                  <span className="count-text">{count}</span>
                </div>
              </div>
              <p className="video-title">{video.title}</p>
            </div>
          </div>
          <hr />
          <div className="related-videos-section">
            <h3 className="related-title">Related Videos</h3>
            <ul className="related-list">
              {relatedVideos.map((relatedVideo, index) => (
                <li key={index}>
                  <button className="related-item" onClick={() => selectVideoCallback(index)}>
                    <img className="related-thumbnail" src={relatedVideo.imageUrl} alt={relatedVideo.title} />
                    <p className="related-text">{relatedVideo.title}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistEndScreen;
