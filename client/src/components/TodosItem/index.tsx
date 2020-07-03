import React from 'react';
import { Link } from 'react-router-dom';

import { useUpdateTodo } from 'hooks/use-update-todo';
import { useDeleteTodo } from 'hooks/use-delete-todo';
import { getFormattedDate } from 'utils/datefn';

type TodosItemProps = {
  id: string;
  name: string;
  createdAt: string;
  dueDate: string;
  attachment?: string;
  done: boolean;
};

export const TodosItem = ({ id, name, done, createdAt, dueDate, attachment }: TodosItemProps) => {
  const [updateTodo] = useUpdateTodo(id);
  const [deleteTodo] = useDeleteTodo(id);

  return (
    <div className="p-4 my-3 shadow rounded-lg">
      <div className="flex">
        <div className="w-full">
          <div className="relative text-gray-900 font-semibold mb-2">
            <div className="text-blue-500 hover:text-blue-800">{name}</div>
            <div className="absolute top-0 right-0">
              <input
                type="checkbox"
                name=""
                id=""
                checked={done}
                onChange={async (e) => await updateTodo({ name, dueDate, done: e.target.checked })}
              />
            </div>
          </div>
          <div className="mb-2">
            <div className="flex">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <div className="text-xs">
                {getFormattedDate(createdAt)} - {getFormattedDate(dueDate)}
              </div>
            </div>
          </div>
          <div>
            <Link
              className="inline-flex items-center mr-4 px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
              to={`/${id}`}
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </Link>
            <button
              type="button"
              className="inline-flex items-center mr-4 px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
              onClick={async () => await deleteTodo()}
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Delete
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
              </svg>
              Attachment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
