import React, { useReducer, FormEvent } from 'react';

import { getDueDate } from 'utils/get-due-date';
import { CreateTodoRequest } from 'types/CreateTodoRequest';

type AddTodoFormState = {
  name: string;
};

interface AddTodoFormAction {
  type: 'RESET' | 'SET_TODO';
  payload: any;
}

type AddTodoFormProps = {
  handleSubmit: (event: FormEvent, data: AddTodoFormState) => void;
};

const initialState: AddTodoFormState = { name: '' };

const reducer = (state: AddTodoFormState, action: AddTodoFormAction): AddTodoFormState => {
  switch (action.type) {
    case 'SET_TODO': {
      return { ...state, name: action.payload };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
};

export const AddTodoForm = ({ handleSubmit }: AddTodoFormProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <form
      onSubmit={(e) => {
        e.persist();

        const data: CreateTodoRequest = { ...state, dueDate: getDueDate() };

        handleSubmit(e, data);
      }}
    >
      <div className="p-4">
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            id="price"
            className="form-input block w-full p-4 sm:text-sm sm:leading-5"
            placeholder="New todo"
            onChange={(e) => dispatch({ type: 'SET_TODO', payload: e.target.value })}
            value={state.name}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              className="flex items-center justify-center w-12 h-12 bg-purple-400 rounded"
              type="submit"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
