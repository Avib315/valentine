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

  const startVideo = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.play();
        videoRef.current.volume = volume;
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Video autoplay was prevented:", error);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      const handleVideoLoaded = async () => {
        setIsVideoLoaded(true);
        await startVideo();

        // Start showing messages only after video is loaded and playing
        messageArray.forEach((_, index) => {
          setTimeout(() => {
            setVisibleMessages(prev => [...prev, index]);
          }, 800 * (index + 1));
        });
      };

      const handleVideoEnded = () => {
        if (videoRef.current) {
          videoRef.current.play(); // Ensure it keeps playing even if loop fails
        }
      };

      videoRef.current.addEventListener('loadeddata', handleVideoLoaded);
      videoRef.current.addEventListener('ended', handleVideoEnded);

      // Force video load if it's taking too long
      const timeoutId = setTimeout(() => {
        if (!isVideoLoaded && videoRef.current) {
          handleVideoLoaded();
        }
      }, 5000); // 5 second timeout

      // Cleanup
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', handleVideoLoaded);
          videoRef.current.removeEventListener('ended', handleVideoEnded);
        }
        clearTimeout(timeoutId);
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

  const togglePlay = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        await startVideo();
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
        muted={false}
        preload="auto"
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