const clientIdSpotify = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecretIdSpotify = import.meta.env.VITE_SPOTIFY_SECRET_CLIENT_ID;

export function useMusic(genre) {
  const [tracks, setTracks] = useState([]);

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

  // Acá busco artistas por el género generado
  async function searchArtistByGenre(genre) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        genre
      )}&type=artist`,
      {
        headers: {
          Authorization: "Bearer " + (await getAccessToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data.artists.items;
  }

  // Función para obtener canciones de un artista
  async function getSongsFromArtist(artistId) {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: {
          Authorization: "Bearer " + (await getAccessToken()),
        },
      }
    );
    const data = await response.json();
    const albums = data.items;

    // Recorrer todos los álbumes y obtener las canciones
    let songs = [];
    for (const album of albums) {
      const albumResponse = await fetch(
        `https://api.spotify.com/v1/albums/${album.id}/tracks`,
        {
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN", // Reemplaza YOUR_ACCESS_TOKEN con tu token de acceso de Spotify
          },
        }
      );
      const albumData = await albumResponse.json();
      songs = [...songs, ...albumData.items];
    }

    return songs;
  }
}
