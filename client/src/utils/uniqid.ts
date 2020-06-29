export const uniqid = (): string =>
  (new Date().getTime() * Math.random()).toString(32).replace('.', '');
