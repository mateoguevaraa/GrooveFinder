import { useState } from "react";
import { useTracks } from "../services/musicFetch";
import { TrackCard } from "./TrackCard";
import { TrackCardSkeleton } from "./TrackCardSkeleton";
import { MusicPlayer } from "./MusicPlayer";
import { useTrackStore } from "../store/trackStore";
import heroImage1 from "../images/mock-hero-x4.webp";

export function CardsDisplay() {
  const { tracks, handleGenreGenerator, genre, loading } = useTracks();
  const [firstTime, setFirstTime] = useState(true);
  const { setCurrentTrack } = useTrackStore((state) => state);

  const userFirstTime = () => {
    setFirstTime(false);
  };

  return (
    <>
      {firstTime === false ? (
        <main>
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
          {genre ? (
            <h3 className="genre-title">
              {genre}
              <span className="w-gradient">.</span>
            </h3>
          ) : null}
          {firstTime ? null : (
            <>
              {tracks.length > 0 ? <MusicPlayer /> : null}
              {loading ? (
                <section className="tracks-display">
                  <TrackCardSkeleton />
                  <TrackCardSkeleton />
                  <TrackCardSkeleton />
                </section>
              ) : null}
              {firstTime === false && tracks.length > 0 && loading === false ? (
                <section className="tracks-display">
                  {tracks.map(function (track, index) {
                    return (
                      <TrackCard
                        trackName={track.name}
                        artist={track.artists[0].name}
                        imageUrl={track.album?.images[1]?.url}
                        songUrl={track.external_urls.spotify}
                        previewUrl={track.preview_url}
                        key={track.uri}
                        trackId={track.id}
                        index={index}
                      />
                    );
                  })}
                </section>
              ) : null}
              {firstTime === false &&
              loading === false &&
              tracks.length === 0 ? (
                <p className="no-found">
                  Oops, no tunes found in the {genre} genre.
                </p>
              ) : null}
            </>
          )}
        </main>
      ) : null}
      {tracks.length === 0 && firstTime ? (
        <>
          <div className="landing-page">
            <div className="hero-section">
              <h1 className="welcome-important">
                Discover New <span className="w-gradient g-span">Grooves</span>,
                Expand Your Playlists
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
              <div className="hero-mock">
                <img
                  src={heroImage1}
                  className="mock-laptop"
                  loading="lazy"
                  alt="GrooveFinder in mobile and desktop view."
                />
              </div>
              </div>
              <div className="hero-image-section">
                <div className="words-slide">
                  <span>Unlock new tracks</span>
                  <i className="fa-solid fa-diamond"></i>
                  <span>Find your groove</span>
                  <i className="fa-solid fa-diamond"></i>
                  <span>Feel the rhythm</span>
                  <i className="fa-solid fa-diamond"></i>
                  <span>Let the music take you places</span>
                  <i className="fa-solid fa-diamond"></i>
                  <span>Repeat.</span>
                  <i className="fa-solid fa-diamond"></i>
                </div>
                <div className="words-slide words-2">
                  <span>Unlock new tracks</span>
                  <i className="fa-solid fa-diamond"></i>
                  <span>Find your groove</span>
                  <i className="fa-solid fa-diamond"></i>
                  <span>Feel the rhythm</span>
                  <i className="fa-solid fa-diamond"></i>
                  <span>Let the music take you places</span>
                  <i className="fa-solid fa-diamond"></i>
                  <span>Repeat.</span>
                  <i className="fa-solid fa-diamond"></i>
                </div>
              </div>
            </div>
        </>
      ) : null}
      <footer>
        <div className="footer-content">
          <p>&copy; 2024 GrooveFinder created by Mateo Guevara.</p>
        </div>
      </footer>
    </>
  );
}
