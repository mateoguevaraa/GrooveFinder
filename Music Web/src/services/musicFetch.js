import { useState } from "react";
import { genres } from "../data/music-genres.json";

const clientIdSpotify = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecretIdSpotify = import.meta.env.VITE_SPOTIFY_SECRET_CLIENT_ID;

export function useTracks() {
  const [tracks, setTracks] = useState([]);
  const [randomIndex, setRandomIndex] = useState();
  const [genre, setGenre] = useState();

  async function searchArtistByGenre(genre) {
    const offset = Math.floor(Math.random() * 20);
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=genre%3A${genre}&type=track&offset=${offset}&limit=30`,
      {
        headers: {
          Authorization: "Bearer " + (await getAccessToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const tracksFetch = data.tracks.items;
    setTracks(tracksFetch);
  }

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

  return { tracks, handleGenreGenerator, genre };
}
