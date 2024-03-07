import { useState } from "react";
import { useTracks } from "../services/musicFetch";
import { TrackCard } from "./TrackCard";
import { TrackCardSkeleton } from "./TrackCardSkeleton";
import { MusicPlayer } from "./MusicPlayer";
import { useTrackStore } from "../store/trackStore";

export function CardsDisplay() {
  const { tracks, handleGenreGenerator, genre, loading } = useTracks();
  const [firstTime, setFirstTime] = useState(true);
  const { setCurrentTrack } = useTrackStore((state) => state);

  const userFirstTime = () => {
    if (firstTime) {
      setFirstTime(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          handleGenreGenerator();
          userFirstTime();
          setCurrentTrack({
            id: null,
            artist: null,
            trackName: null,
            previewUrl: null,
          });
        }}
        className="btn"
      >
        Find New Genre
      </button>
      {genre ? <h3 className="genre-title">{genre}</h3> : null}
      <section className="tracks-display">
        {tracks.length > 0 ? <MusicPlayer /> : null}
        {loading ? (
          <>
            <TrackCardSkeleton />
            <TrackCardSkeleton />
            <TrackCardSkeleton />
          </>
        ) : tracks.length > 0 ? (
          tracks.map(function (track) {
            return (
              <TrackCard
                trackName={track.name}
                artist={track.artists[0].name}
                imageUrl={track.album.images[1].url}
                songUrl={track.external_urls.spotify}
                previewUrl={track.preview_url}
                key={track.uri}
                trackId={track.id}
              />
            );
          })
        ) : firstTime ? (
          <p className="welcome-message">
            <strong className="welcome-important">
              Ready to uncover new beats?{" "}
            </strong>
            <br />
            Click the button and let the genre exploration begin!
          </p>
        ) : (
          <p className="no-found">Oops, no tunes found in the {genre} genre.</p>
        )}
      </section>
    </>
  );
}
