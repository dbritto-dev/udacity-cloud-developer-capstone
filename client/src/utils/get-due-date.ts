const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

export const getDueDate = (date = new Date()) =>
  new Date(date.getTime() + SEVEN_DAYS).toISOString();
