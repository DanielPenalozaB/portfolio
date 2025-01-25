'use client';

interface GrainOverlayProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

export default function GrainOverlay({
  children,
  className = '', intensity ='medium'
}: GrainOverlayProps) {
  const opacityMap = {
    light: '0.15',
    medium: '0.25',
    heavy: '0.35'
  };

  return (
    <div className={`relative ${className}`}>
      {children}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: opacityMap[intensity],
          background: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`,
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
};