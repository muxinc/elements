import React, { useEffect, useState } from 'react';
import { VideoItem } from '.';
import style from './playlist-end-screen.css';

type PlaylistEndScreenProps = {
  currentIndex: number;
  relatedVideos: VideoItem[];
  visible: boolean;
  selectVideoCallback: (index: number) => void;
};

const PlaylistEndScreen = ({
  currentIndex = 0,
  relatedVideos,
  visible,
  selectVideoCallback,
}: PlaylistEndScreenProps) => {
  const [count, setCount] = useState(3);
  const video = relatedVideos[currentIndex];

  useEffect(() => {
    if (!visible) {
      setCount(3);
      return;
    }

    // For the countdown, simply select the "next" video. If at the end, cycle back to the 0th video.
    if (count < 0) {
      const nextIndex = (currentIndex + 1) % relatedVideos.length;
      selectVideoCallback(nextIndex);
      return;
    }
    const timer = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, -1));
    }, 1000);

    return () => clearInterval(timer);
  }, [count, visible]);

  return (
    <>
      <style>{style}</style>
      <div className="playlist" style={{ display: visible ? 'grid' : 'none' }}>
        <div className="overlay" style={{ display: visible ? 'grid' : 'none' }} />
        <div className="post-video-section" style={{ display: visible ? 'grid' : 'none', zIndex: 99 }}>
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
