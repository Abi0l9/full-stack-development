export const assertNever = (value: never): never => {
  throw new Error(`Unhandled type included`);
};
