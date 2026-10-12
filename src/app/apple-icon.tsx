import { ImageResponse } from "next/og";
import { BrandMark } from "./brand-mark";

// Icône quand le site est ajouté à l'écran d'accueil d'un iPhone (iOS arrondit lui-même les coins)
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<BrandMark size={180} radius={0} />, size);
}
