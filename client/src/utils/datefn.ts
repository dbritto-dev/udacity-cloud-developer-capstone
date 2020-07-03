export const getFormattedDate = (stringDate: string): string =>
  new Date(stringDate).toLocaleString();
