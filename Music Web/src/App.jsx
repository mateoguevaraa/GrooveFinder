import { useState, useEffect } from "react";
import { genres } from "./data/music-genres.json";
import "./style.css";

const clientIdSpotify = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecretIdSpotify = import.meta.env.VITE_SPOTIFY_SECRET_CLIENT_ID;

function App() {
  const [genre, setGenre] = useState();
  const [artists, setArtists] = useState();
  const [randomIndex, setRandomIndex] = useState();

  const handleGenreGenerator = () => {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * genres.length);
    } while (randomNumber === randomIndex);

    const genreRandom = genres[randomNumber].name;
    setGenre(genreRandom);
    setRandomIndex(randomNumber);
    searchArtistByGenre(genreRandom);
  };

  async function searchArtistByGenre(genre) {
    const offset = Math.floor(Math.random() * 50);
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=genre%3A${genre}&type=track&offset=${offset}`,
      {
        headers: {
          Authorization: "Bearer " + (await getAccessToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.tracks.items);
    const artistsFetch = data.tracks.items;
    setArtists(artistsFetch);
  }

  async function getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + btoa(clientIdSpotify + ":" + clientSecretIdSpotify),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const data = await response.json();
    return data.access_token;
  }

  return (
    <main>
      <h1>Genre Discover</h1>
      <button onClick={handleGenreGenerator}>Discover a new genre</button>
      {genre ? <p>{genre}</p> : null}
    </main>
  );
}

export default App;
