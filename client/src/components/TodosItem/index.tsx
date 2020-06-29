import React from 'react';

export const TodosItem = () => {
  return (
    <div className="p-4 my-3 shadow rounded-lg">
      <div className="flex">
        <div className="w-full">
          <div className="relative text-gray-900 font-semibold mb-2">
            <a href="#">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint labore repudiandae
              quis, dolorum non possimus consequatur sit, itaque sunt aliquid sed! Culpa atque vitae
              sint quasi? Animi maiores doloremque asperiores.
            </a>
            <div className="absolute top-0 right-0">
              <input type="checkbox" name="" id="" />
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
              <div className="text-xs">CREATED AT - DUE DATE</div>
            </div>
          </div>
          <div>
            <div className="border border-gray-200 rounded-md">
              <div className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                <div className="w-0 flex-1 flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 flex-1 w-0 truncate">Attachment</span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
