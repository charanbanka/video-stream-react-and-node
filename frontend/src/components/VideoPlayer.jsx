import React, { useEffect, useRef } from "react";
import { API_URL } from "../config";

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  });

  return (
    <video ref={videoRef} width="100%" height="90%" controls autoPlay>
      <source src={`${API_URL}/videos/${videoId}`} type="video/mp4"></source>
      Your doesn't support the video
    </video>
  );
};

export default VideoPlayer;
