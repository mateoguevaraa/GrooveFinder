export function TrackCard({ trackName, artist, imageUrl }) {
  return (
    <div className="card">
      <img
        src={imageUrl}
        alt={`album cover of the song: ${trackName}`}
        className="card-img-top"
      />
      <div className="card-body">
        <p>
          <strong className="card-title">{trackName}</strong>
        </p>
        <p>{artist}</p>
      </div>
    </div>
  );
}
