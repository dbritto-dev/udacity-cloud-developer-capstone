import React, { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Navbar } from 'components/Navbar';
import { fetch, createFetchWithToken } from 'utils/unfetch';
import { useToken } from 'hooks/use-token';

const API_URI = process.env.REACT_APP_API_URI;

export const EditTodosItemScreen = () => {
  const token = useToken();
  const { todoId = '' } = useParams();
  // const { data } = useGetUploadUrl(todoId);
  // console.log(data);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const file = e.target.querySelector('input[type=file]').files[0] as File;

      try {
        const data = await createFetchWithToken(token)<{ uploadUrl: string }>(
          `${API_URI}/todos/${todoId}/attachment`,
          {
            method: 'POST',
            body: '',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        await fetch(data?.uploadUrl as string, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        });

        window.alert('File was uploaded!');
      } catch (e) {
        window.alert('Files was not uploaded!');
      }
    },
    [token, todoId]
  );

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
              <div className="p-4">
                <form
                  onSubmit={(e) => {
                    e.persist();

                    handleSubmit(e);
                  }}
                >
                  <input type="file" name="attachment" accept="image/*" required />
                  <button
                    type="submit"
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
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    Upload
                  </button>
                </form>
                <div className="mt-4">
                  <Link
                    className="inline-flex items-center mr-4 px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                    to="/"
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
                      <path d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </div>
  );
};
