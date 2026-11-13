/**
 * Color manipulation utilities.
 */

/**
 * Appends alpha hex channel to a 6-digit hex color code.
 * @param hex Hex color code (e.g. "#00E5FF")
 * @param alpha Decimal alpha value from 0 to 1 (e.g. 0.35)
 */
export function withAlpha(hex: string, alpha: number): string {
  const sanitized = hex.replace('#', '');
  const clampedAlpha = Math.min(1, Math.max(0, alpha));
  const alphaHex = Math.round(clampedAlpha * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();
  return `#${sanitized}${alphaHex}`;
}

/**
 * Converts a hex code to an rgba CSS color string.
 * @param hex Hex color code (e.g. "#00E5FF")
 * @param alpha Decimal opacity from 0 to 1
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  const sanitized = hex.replace('#', '');
  const r = parseInt(sanitized.substring(0, 2), 16) || 0;
  const g = parseInt(sanitized.substring(2, 4), 16) || 0;
  const b = parseInt(sanitized.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

