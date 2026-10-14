/**
 * Phone number validation shared by the browser forms and the server.
 *
 * Accepts the usual ways people type numbers in Azerbaijan and abroad:
 * "050 123 45 67", "(050) 123-45-67", "+994 50 123 45 67", "994501234567", "501234567".
 * Rejects text without enough digits (e.g. "abc", "123").
 */
export function isValidPhoneNumber(input: string | undefined | null): boolean {
  if (!input || typeof input !== 'string') return false;
  const trimmed = input.trim();
  // Only digits, spaces and common separators are allowed
  if (!/^\+?[\d\s\-().]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
