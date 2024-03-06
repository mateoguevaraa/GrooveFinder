import { useState, useRef } from "react";

export function TrackCard({
  trackName,
  artist,
  imageUrl,
  songUrl,
  previewUrl,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
      setCurrentTrack(previewUrl);
    } else {
      audioRef.current.pause();
      setCurrentTrack(null);
    }
  };

  const playTrack = () => {
    if (currentTrack === previewUrl) {
      toggleAudio();
    } else {
      if (currentTrack) {
        const prevAudio = document.querySelector(
          `audio[src="${currentTrack}"]`
        );
        if (prevAudio) {
          prevAudio.pause();
        }
      }
      setCurrentTrack(previewUrl);
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  return (
    <div className="card">
      <div className="image-container">
        <img
          src={imageUrl}
          alt={`album cover of the song: ${trackName}`}
          className="card-img-top"
          loading="lazy"
        />
        <div className="overlay"></div>
        <button className="centered-button">
          <a href={songUrl} target="blank">
            Listen on Spotify
          </a>
        </button>
      </div>
      <div className="card-body">
        <p className="card-name">
          <strong className="card-title">{trackName}</strong>
        </p>
        <div className="card-bottom">
          <p className="card-description">{artist}</p>
          <button className="button-audio" onClick={playTrack}>
            {isPlaying ? (
              <i className="fa-solid fa-pause pause-button"></i>
            ) : (
              <i className="fa-solid fa-play play-button"></i>
            )}
          </button>
          <audio ref={audioRef} src={previewUrl}></audio>
        </div>
      </div>
    </div>
  );
}
