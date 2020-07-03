import React from 'react';
import { queryCache } from 'react-query';

import { Navbar } from 'components/Navbar';
import { AddTodoForm } from 'components/AddTodoForm';
import { Todos } from 'components/Todos';

import { useCreateTodo } from 'hooks/use-create-todo';

export const DashboardScreen = () => {
  const [createTodo] = useCreateTodo();

  return (
    <div>
      <header className="bg-white shadow">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Todos</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* <!-- Replace with your content --> */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg">
              {/* header */}
              <AddTodoForm
                handleSubmit={async (e, data) => {
                  e.preventDefault();

                  await createTodo(data as { name: string; dueDate: string });

                  queryCache.invalidateQueries(`todos:all`);
                }}
              />
              {/* todos */}
              <div className="mx-4">
                <Todos />
              </div>
            </div>
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </div>
  );
};
