/** Solid fox silhouette (no inner cut-outs). Used for the halftone strips. */
export default function FoxSilhouette({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={Math.round(size * (141 / 134))}
      viewBox="0 0 134 141"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M122.208 0L87.905 40.592L67 48.071L46.095 40.592L11.792 0L0 96.137L54.137 141H79.863L134 96.137L122.208 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
