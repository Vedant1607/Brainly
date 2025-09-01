export const random = (len: number): string => {
  const chars = "ghowiehgiovbfbsnvnmqgrvuiorehgbv"
  return Array.from(
    { length: len },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};