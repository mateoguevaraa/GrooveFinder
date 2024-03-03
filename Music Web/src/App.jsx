import { useState } from "react";
import "./style.css";

function App() {
  const [artist, setArtist] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = Object.fromEntries(new window.FormData(event.target));
    const artist = fields.artist;
    console.log(artist);
    fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`)
      .then((res) => res.json())
      .then((data) => setArtist(data.artists[0].strArtist));
    console.log(artist);
  };

  return (
    <main>
      <h1>Music App</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="artist"
          placeholder="Coldplay, The Weeknd..."
        />
        <button type="submit">Search</button>
      </form>
      {artist && <p>{artist}</p>}
    </main>
  );
}

export default App;
