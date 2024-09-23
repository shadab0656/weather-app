export const farenheitConverter = (number) => {
  const fahrenheit = (number * 9) / 5 + 32;
  const result = fahrenheit.toFixed(2);
  return result;
};
