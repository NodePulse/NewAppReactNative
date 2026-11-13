/**
 * Utility functions for formatting currency, card numbers, and numbers.
 */

export interface CurrencyFormatOptions {
  showCents?: boolean;
  prefix?: string;
  suffix?: string;
}

/**
 * Formats a numeric amount as currency (e.g., $25,000 or $19.99).
 */
export function formatCurrency(
  amount: number,
  options?: CurrencyFormatOptions,
): string {
  const prefix = options?.prefix ?? '$';
  const suffix = options?.suffix ?? '';
  const showCents = options?.showCents ?? false;

  const formattedNum = showCents
    ? amount.toFixed(2)
    : amount.toLocaleString();

  return `${prefix}${formattedNum}${suffix}`;
}

/**
 * Masks a credit/debit card number (e.g., "4532 •••• •••• 8892").
 */
export function maskCardNumber(cardNumber: string): string {
  if (!cardNumber || cardNumber.length < 8) return cardNumber;
  const firstFour = cardNumber.slice(0, 4);
  const lastFour = cardNumber.slice(-4);
  return `${firstFour} •••• •••• ${lastFour}`;
}

/**
 * Formats card number showing only the last 4 digits (e.g., "•••• 8892").
 */
export function formatLastFourDigits(cardNumber: string): string {
  if (!cardNumber) return '••••';
  return `•••• ${cardNumber.slice(-4)}`;
}

/**
 * Formats a card number, masking it unless explicitly revealed.
 */
export function formatCardNumber(
  cardNumber: string,
  isRevealed: boolean = false,
): string {
  if (isRevealed) {
    return cardNumber;
  }
  return maskCardNumber(cardNumber);
}

