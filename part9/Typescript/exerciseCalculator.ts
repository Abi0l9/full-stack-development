interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
