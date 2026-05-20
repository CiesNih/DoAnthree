import '../styles/Skeleton.css';

export function SkeletonText({ width = '100%', height = '16px', style = {} }) {
  return (
    <div 
      className="skeleton skeleton-text" 
      style={{ width, height, ...style }}
    />
  );
}

export function SkeletonJobCard() {
  return (
    <div className="skeleton-job-card">
      <div className="skeleton skeleton-avatar" />
      <div className="skeleton-content">
        <SkeletonText width="70%" height="20px" style={{ marginBottom: '10px' }} />
        <SkeletonText width="50%" height="16px" style={{ marginBottom: '8px' }} />
        <SkeletonText width="40%" height="16px" style={{ marginBottom: '12px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <SkeletonText width="80px" height="24px" />
          <SkeletonText width="80px" height="24px" />
          <SkeletonText width="80px" height="24px" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 5 }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-table-row">
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="skeleton skeleton-table-cell" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <SkeletonText width="60%" height="24px" style={{ marginBottom: '15px' }} />
      <SkeletonText width="100%" style={{ marginBottom: '8px' }} />
      <SkeletonText width="90%" style={{ marginBottom: '8px' }} />
      <SkeletonText width="80%" style={{ marginBottom: '15px' }} />
      <SkeletonText width="120px" height="36px" />
    </div>
  );
}
