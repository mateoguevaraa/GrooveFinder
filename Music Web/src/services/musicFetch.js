import { useState } from "react";
import { genres } from "../data/music-genres.json";

const clientIdSpotify = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecretIdSpotify = import.meta.env.VITE_SPOTIFY_SECRET_CLIENT_ID;

export function useTracks() {
  const [tracks, setTracks] = useState([]);
  const [randomIndex, setRandomIndex] = useState();
  const [genre, setGenre] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function searchArtistByGenre(genre) {
    setLoading(true);
    try {
      const offset = Math.floor(Math.random() * 40);
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=genre%3A${genre}&type=track&offset=${offset}&limit=15`,
        {
          headers: {
            Authorization: "Bearer " + (await getAccessToken()),
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tracks from Spotify API");
      }
      const data = await response.json();
      const tracksFetch = data.tracks.items;
      setTracks(tracksFetch);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + btoa(clientIdSpotify + ":" + clientSecretIdSpotify),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch access token from Spotify API");
      }
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      setError(error.message);
    }
  }

  return { tracks, handleGenreGenerator, genre, loading, error };
}
