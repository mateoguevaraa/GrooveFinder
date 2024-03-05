import { useState, useEffect } from "react";
import { useTracks } from "./services/musicFetch";
// import { Card } from "./components/trackCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  const { tracks, handleGenreGenerator, genre } = useTracks();

  return (
    <main>
      <h1>Genre Discover</h1>
      <button onClick={handleGenreGenerator} className="btn btn-primary">
        Discover a new genre
      </button>
      {genre ? <p>{genre}</p> : null}
      <section className="tracks-display">
        {tracks.map(function (track) {
          return (
            <div key={track.id} className="tracks card">
              <img
                src={track.album.images[1].url}
                alt={`${track.artists.name} cover`}
                className="card-img-top"
              />
              <div className="card-body">
                <strong className="card-title">{track.name}</strong>
                <p>{track.artists[0].name}</p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
