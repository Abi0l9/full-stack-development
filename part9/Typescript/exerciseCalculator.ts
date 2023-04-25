import { isNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): number[] => {
  const [, , ...rest] = args;
  const valsCheck = rest.every((val) => isNumber(val));

  if (rest.length < 2) throw new Error("not enough arguments");
  if (valsCheck) {
    const pars = rest.map((el) => Number(el));

    const target = pars.pop() as number;

    return [target, ...pars];
  } else {
    throw new Error("parameters have to be numbers");
  }
};

export const calculateExercises = (args: number[], target: number): Result => {
  const periodLength = args.length;
  const average = args.reduce((acc, value) => acc + value, 0) / args.length;
  const trainingDays = args.filter((day) => day > 0).length;

  // const avgFixed = +average.toFixed(1);
  const good = 3;
  const mid = 2;
  const bad = 1;

  let rating = 0;

  if ((trainingDays / target) * 3 <= bad) {
    rating = bad;
  } else if ((trainingDays / target) * 3 <= mid) {
    rating = mid;
  } else if ((trainingDays / target) * 3 <= good) {
    rating = good;
  } else if (target < trainingDays) {
    rating = good;
  }

  const success = rating <= 2 ? false : true;

  let ratingDescription = "";
  if (rating === 1) {
    ratingDescription = "This isn't a good result, strive to do better";
  } else if (rating === 2) {
    ratingDescription = "Not bad but you can do better";
  } else if (rating === 3) {
    ratingDescription = "Beautiful, You are on the right path!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  // const target: number;
  // const days: number[];
  const [target, ...days] = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error) {
  let errorMsg = "Something happened :";
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.log(errorMsg);
}
