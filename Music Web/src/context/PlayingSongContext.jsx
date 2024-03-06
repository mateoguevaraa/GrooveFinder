import { createContext, useContext, useRef, useState } from "react";

const PlayingContext = createContext();

export function usePlayingContext() {
  return useContext(PlayingContext);
}

export function PlayingProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  const playTrack = (previewUrl) => {
    if (currentTrack === previewUrl) {
      audioRef.current.paused
        ? audioRef.current.play()
        : audioRef.current.pause();
    } else {
      if (currentTrack) {
        audioRef.current.pause();
      }
      setCurrentTrack(previewUrl);
      audioRef.current.src = previewUrl;
      audioRef.current.play();
    }
  };

  return (
    <PlayingContext.Provider value={{ playTrack, audioRef }}>
      <audio ref={audioRef} onEnded={() => setCurrentTrack(null)} />
      {children}
    </PlayingContext.Provider>
  );
}
