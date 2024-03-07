import { useEffect } from "react";
import { Play, Pause } from "./MusicPlayer";
import { useTrackStore } from "../store/trackStore";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
export const CardPlayButton = ({ artist, trackName, url, id }) => {
  const { isPlaying, currentTrack, setIsPlaying, setCurrentTrack } =
    useTrackStore((state) => state);

  const isThisCardPlaying = isPlaying && currentTrack?.id === id;

  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  const previewNotAvailableNotify = () =>
    toast("Sorry, no preview available for this track 😕", {
      duration: 2000,
      position: "bottom-right",
      className: "notification",
    });

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
    if (url === null) {
      previewNotAvailableNotify();
      setCurrentTrack({
        id: null,
        artist: null,
        trackName: null,
        previewUrl: null,
      });
    }
  };

  return (
    <>
      <button className="button-audio p-2" onClick={handleClick}>
        <div style={{ width: "24px", height: "24px" }}>
          {isThisCardPlaying ? <Pause /> : <Play />}
        </div>
      </button>
      <Toaster />
    </>
  );
};
