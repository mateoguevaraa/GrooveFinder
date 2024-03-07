import { CardPlayButton } from "./CardPlayButton";

export function TrackCard({
  // eslint-disable-next-line react/prop-types
  trackName,
  // eslint-disable-next-line react/prop-types
  artist,
  // eslint-disable-next-line react/prop-types
  imageUrl,
  // eslint-disable-next-line react/prop-types
  songUrl,
  // eslint-disable-next-line react/prop-types
  previewUrl,
  // eslint-disable-next-line react/prop-types
  trackId,
}) {
  return (
    <div className="card">
      <div className="image-container">
        <img
          src={imageUrl}
          alt={`album cover of the song: ${trackName}`}
          className="card-img-top"
          loading="lazy"
        />
        <div className="overlay"></div>
        <button className="centered-button">
          <a href={songUrl} target="blank">
            Listen on Spotify
          </a>
        </button>
      </div>
      <div className="card-body">
        <p className="card-name">
          <strong className="card-title">{trackName}</strong>
        </p>
        <div className="card-bottom">
          <p className="card-description">{artist}</p>
          <CardPlayButton
            url={previewUrl}
            artist={artist}
            trackName={trackName}
            id={trackId}
          />
        </div>
      </div>
    </div>
  );
}
