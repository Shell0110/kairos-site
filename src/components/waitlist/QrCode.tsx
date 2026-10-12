import QRCode from "qrcode";

/**
 * QR code en SVG, calculé côté serveur au build : aucun JavaScript envoyé au navigateur.
 */
export function QrCode({ value, size = 132, label }: { value: string; size?: number; label: string }) {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: "M" });
  const count = modules.size;

  let path = "";
  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      if (modules.get(x, y)) path += `M${x} ${y}h1v1h-1z`;
    }
  }

  return (
    <svg
      role="img"
      aria-label={label}
      width={size}
      height={size}
      viewBox={`-2 -2 ${count + 4} ${count + 4}`}
      shapeRendering="crispEdges"
      className="rounded-xl bg-base-100"
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}
