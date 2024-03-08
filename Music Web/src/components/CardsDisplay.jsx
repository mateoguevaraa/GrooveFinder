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
    setFirstTime(false);
  };

  return (
    <>
      {firstTime ? null : (
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
          Explore New Genre
        </button>
      )}
      {genre ? <h3 className="genre-title">{genre}<span className="w-gradient">.</span></h3> : null}
      {firstTime ? null : (
        <section className="tracks-display">
          {tracks.length > 0 ? <MusicPlayer /> : null}
          {loading ? (
            <>
              <TrackCardSkeleton />
              <TrackCardSkeleton />
              <TrackCardSkeleton />
            </>
          ) : null}
          {tracks.length > 0 && loading === false
            ? tracks.map(function (track) {
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
            : null}
        </section>
      )}
      {tracks.length === 0 && firstTime ? (
        <div className="hero-section">
          <h1 className="welcome-important">
            Discover New <span className="w-gradient">Grooves</span>, Expand
            Your Playlists
          </h1>
          <h2 className="welcome-description">
            Unlock hidden grooves, explore new beats, and expand your music
            realm with GrooveFinder.
          </h2>
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
            className="btn-hero"
          >
            Explore New Tracks
          </button>
        </div>
      ) : null}
      {firstTime === false && loading === false && tracks.length === 0 ? (
        <p className="no-found">Oops, no tunes found in the {genre} genre.</p>
      ) : null}
    </>
  );
}
