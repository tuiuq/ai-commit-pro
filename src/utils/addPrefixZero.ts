export function addPrefixZero(str: string | number, length: number = 2) {
  return String(str).padStart(length, '0')
}