import React from 'react';

import { useTodos } from './use-todos';

export const Todos = () => {
  const data = useTodos();

  return <div>{JSON.stringify(data)}</div>;
};
