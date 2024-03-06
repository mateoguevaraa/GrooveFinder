export function TrackCard({ trackName, artist, imageUrl, songUrl }) {
  return (
    <div className="card">
      <div className="image-container">
        <img
          src={imageUrl}
          alt={`album cover of the song: ${trackName}`}
          className="card-img-top"
        />
        <div className="overlay"></div>
        <button className="centered-button">
          <a href={songUrl} target="blank">
            Listen on Spotify
          </a>
        </button>
      </div>
      <div className="card-body">
        <p>
          <strong className="card-title">{trackName}</strong>
        </p>
        <p className="card-description">{artist}</p>
      </div>
    </div>
  );
}
