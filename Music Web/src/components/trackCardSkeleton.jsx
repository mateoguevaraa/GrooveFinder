export function TrackCardSkeleton() {
  return (
    <div className="card skeleton">
      <div className="skeleton-img skeleton-animation"></div>
      <div className="skeleton-body">
        <div className="skeleton-title skeleton-animation"></div>
        <div className="skeleton-description skeleton-animation"></div>
      </div>
    </div>
  );
}
