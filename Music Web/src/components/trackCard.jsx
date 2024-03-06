import { useState, useEffect } from "react";
import { usePlayingContext } from "../context/PlayingSongContext";

export function TrackCard({
  trackName,
  artist,
  imageUrl,
  songUrl,
  previewUrl,
}) {
  const { playTrack, audioRef } = usePlayingContext();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current.play) {
      if (audioRef.current.src === previewUrl) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [audioRef, previewUrl]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // si el src del audio es null mostrar una alerta o
    // notificación de que no esta disponible
    playTrack(previewUrl);
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
          <button className="button-audio" onClick={toggleAudio}>
            <i
              className={`fa-solid ${
                isPlaying ? "fa-pause pause-button" : "fa-play play-button"
              }`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
