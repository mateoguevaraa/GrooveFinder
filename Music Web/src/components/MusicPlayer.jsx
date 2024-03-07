import { useRef, useEffect } from "react";

import { useTrackStore } from "../store/trackStore";

export const Pause = () => <i className="fa-solid fa-pause pause-button"></i>;

export const Play = () => <i className="fa-solid fa-play play-button"></i>;

export function MusicPlayer() {
  const { isPlaying, currentTrack } = useTrackStore(
    (state) => state
  );
  const audioRef = useRef();

  useEffect(() => {
    if (currentTrack.previewUrl && isPlaying) {
      audioRef.current.src = currentTrack.previewUrl;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  return (
    <>
      <audio ref={audioRef} src={currentTrack.previewUrl}></audio>
    </>
  );
}
