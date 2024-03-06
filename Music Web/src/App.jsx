import { useState } from "react";
import { useTracks } from "./services/musicFetch";
import { PlayingProvider } from "./context/PlayingSongContext";
import { TrackCard } from "./components/TrackCard";
import { NavBar } from "./components/Navbar";
import { TrackCardSkeleton } from "./components/TrackCardSkeleton";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  const { tracks, handleGenreGenerator, genre, loading } = useTracks();
  const [firstTime, setFirstTime] = useState(true);

  const userFirstTime = () => {
    if (firstTime) {
      setFirstTime(false);
    }
  };

  return (
    <>
      <NavBar />
      <main>
        <button
          onClick={() => {
            handleGenreGenerator();
            userFirstTime();
          }}
          className="btn"
        >
          Find New Genre
        </button>
        {genre ? <h3 className="genre-title">{genre}</h3> : null}
        <section className="tracks-display">
          <PlayingProvider>
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
                    key={track.id}
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
              <p className="no-found">
                Oops, no tunes found in the {genre} genre.
              </p>
            )}
          </PlayingProvider>
        </section>
      </main>
    </>
  );
}

export default App;
