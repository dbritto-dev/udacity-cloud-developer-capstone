import React from 'react';

import { useTodos } from '../../hooks/use-todos';

export const Todos = () => {
  const data = useTodos();

  return <div>{JSON.stringify(data)}</div>;
};
