export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const wrapIndex = (index, length) => {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
};
