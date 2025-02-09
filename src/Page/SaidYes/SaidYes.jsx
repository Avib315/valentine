import React, { useEffect, useRef, useState } from 'react'
import video from "../../assets/video/yes.mp4"
import "./style.scss"
import { getDetailsFromUrlParams } from '../../CommonFunction/getDetailsFromUrlParams'

export default function SaidYes() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  const { gender, name, time } = getDetailsFromUrlParams()
  const isMale = gender === "male" 
  
  const word = {
    promise: isMale ? "מבטיחה" : "מבטיח",
    dis: isMale ? "תתאכזב" : "תתאכזבי",
    ready: isMale ? "שתהיה מוכן" : "שתהיי מוכנה"
  } 
  
  const messageArray = [
    `הולך להיות ערב קסום`,
    `${word.promise} שלא ${word.dis}`,
    `אני רוצה ${word.ready} בשעה: ${time}`,
  ]

  useEffect(() => {
    if (videoRef.current) {
      // Add event listeners for video loading
      const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
        videoRef.current.play().catch(error => {
          console.log("Video playback was prevented:", error);
        });
        videoRef.current.volume = volume;

        // Start showing messages only after video is loaded
        messageArray.forEach((_, index) => {
          setTimeout(() => {
            setVisibleMessages(prev => [...prev, index]);
          }, 800 * (index + 1));
        });
      };

      videoRef.current.addEventListener('loadeddata', handleVideoLoaded);

      // Cleanup
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', handleVideoLoaded);
        }
      };
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
      {!isVideoLoaded && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">טוען...</div>
        </div>
      )}

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

      {isVideoLoaded && (
        <>
          <div className="messages-container">
            {messageArray.map((message, index) => (
              <div
                key={index}
                className={`message ${visibleMessages.includes(index) ? 'visible' : ''}`}
              >
                {message}
              </div>
            ))}
          </div>

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
        </>
      )}
    </div>
  )
}