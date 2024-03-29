export const calculateBmi = (height: number, weight: number): string => {
  const heightInMtrs: number = height / 100;
  const result = Number((weight / (heightInMtrs * heightInMtrs)).toFixed(1));

  if (result < 18.5) {
    return "Underweight (Unhealthy)";
  } else if (result < 24.9) {
    return `Normal (Healthy weight)`;
  } else if (result < 29.9) {
    return `Obesity (Class 1)`;
  } else if (result < 34.9) {
    return `Obesity (Class 2)`;
  } else if (result < 39.9) {
    return `Obesity (Class 2)`;
  } else if (result > 40.0) {
    return `Obesity (Class 2)`;
  }

  if (weight === null || height === null) {
    return `one or two parameters missing`;
  }

  return "malformated parameters";
};
