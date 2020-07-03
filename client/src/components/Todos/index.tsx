import React from 'react';

import { useTodos } from 'hooks/use-todos';
import { TodosItem } from 'components/TodosItem';

export const Todos = () => {
  const { data, isLoading, isError } = useTodos();

  if (isError) return <div className="p-4">Error.</div>;
  if (isLoading) return <div className="p-4">Fetching...</div>;

  return (
    <>
      {data?.items.map((item, index) => (
        <TodosItem
          key={`todo-item-${index}`}
          id={item.todoId}
          name={item.name}
          done={item.done}
          createdAt={item.createdAt}
          dueDate={item.dueDate}
        />
      ))}
    </>
  );
};
