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

const parseArguments = (args: string[]) => {
  const [, , ...rest] = args;
  const valsCheck = rest.every((val) => isNumber(val));

  if (rest.length < 2) throw new Error("not enough arguments");
  if (valsCheck) {
    const pars = rest.map((el) => Number(el));
    const target = pars.pop();
    return [target, ...pars];
  } else {
    throw new Error("parameters have to be numbers");
  }
};

const calculateExercises = (args: number[], target: number): Result => {
  const periodLength = args.length;
  const average = args.reduce((acc, value) => acc + value, 0) / args.length;
  const trainingDays = args.filter((day) => day > 0).length;
  const success = average >= target;

  const avgFixed = +average.toFixed(1);
  const rating = avgFixed < 1 ? 1 : avgFixed > 1 && avgFixed < 2 ? 2 : 3;

  let ratingDescription;
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
  const [target, ...days] = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error) {
  let errorMsg = "Something happened :";
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.log(errorMsg);
}
