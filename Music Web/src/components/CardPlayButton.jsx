import { Play, Pause } from "./MusicPlayer";
import { useTrackStore } from "../store/trackStore";

// eslint-disable-next-line react/prop-types
export const CardPlayButton = ({ artist, trackName, url, id }) => {
  const { isPlaying, currentTrack, setIsPlaying, setCurrentTrack } =
    useTrackStore((state) => state);

  const isThisCardPlaying = isPlaying && currentTrack?.id === id;

  const handleClick = () => {
    if (isThisCardPlaying) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    setCurrentTrack({
      id: id,
      artist: artist,
      trackName: trackName,
      previewUrl: url,
    });
  };

  return (
    <>
      <button className="button-audio p-2" onClick={handleClick}>
        {isThisCardPlaying ? <Pause /> : <Play />}
      </button>
    </>
  );
};
