import React from 'react';

import { TodosItem } from 'components/TodosItem';
import { AddTodoForm } from 'components/AddTodoForm';
import { useTodos } from 'hooks/use-todos';

export const Dashboard = () => {
  const { data: todos, isLoading, isError } = useTodos();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error.</div>;

  return (
    <div>
      <header className="bg-white shadow">
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8" src="/logo192.png" alt="Workflow logo" />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* <!-- Profile dropdown --> */}
                  <div className="ml-3 relative">
                    <div>
                      <button
                        className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </button>
                    </div>
                    {/* <!--
                  Profile dropdown panel, show/hide based on dropdown state.

                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                --> */}
                    <div className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                      <div
                        className="py-1 rounded-md bg-white shadow-xs"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Your Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* <!-- Mobile menu button --> */}
                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                  {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
                  <svg
                    className="block h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
                  <svg
                    className="hidden h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* <!--
        Mobile menu, toggle classes based on menu state.

        Open: "block", closed: "hidden"
      --> */}
          <div className="hidden md:hidden">
            <div className="px-2 pt-2 pb-3 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Team
              </a>
              <a
                href="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Projects
              </a>
              <a
                href="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Calendar
              </a>
              <a
                href="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Reports
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                  <div className="mt-1 text-sm font-medium leading-none text-gray-400">
                    tom@example.com
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </nav>
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
                handleSubmit={(e) => {
                  e.preventDefault();

                  console.log('submit');
                }}
              />
              {/* todos */}
              <div className="mx-4">
                {todos?.items.map((todo) => (
                  <TodosItem />
                ))}
              </div>
            </div>
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </div>
  );
};
