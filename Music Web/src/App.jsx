import { useState, useEffect } from "react";
import { useTracks } from "./services/musicFetch";
import { TrackCard } from "./components/trackCard";
import { NavBar } from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  const { tracks, handleGenreGenerator, genre } = useTracks();

  return (
    <>
      <NavBar />
      <main>
        <button onClick={handleGenreGenerator} className="btn">
          Find New Genre
        </button>
        {genre ? <h3 className="genre-title">{genre}</h3> : null}
        <section className="tracks-display">
          {tracks.map(function (track) {
            return (
              <TrackCard
                trackName={track.name}
                artist={track.artists[0].name}
                imageUrl={track.album.images[1].url}
                key={track.id}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default App;
