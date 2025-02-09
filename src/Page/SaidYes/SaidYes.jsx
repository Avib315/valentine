import React, { useEffect, useRef, useState } from 'react'
import video from "../../assets/video/yes.mp4"
import "./style.scss"

export default function SaidYes() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5); // 50% volume by default

  useEffect(() => {
    // Start playing video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video playback was prevented:", error);
      });
      videoRef.current.volume = volume;
    }
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="said-yes-container">
      <video
        ref={videoRef}
        className="celebration-video"
        playsInline
        autoPlay
        loop
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="video-controls">
        <button onClick={togglePlay} className="play-pause-btn">
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <div className="volume-control">
          <span className="volume-icon">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  )
}