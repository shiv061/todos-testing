import { Switch } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useAppState } from '../hooks/useAppState';

export const Todo = ({ id, data, completed }) => {
  const { dispatch } = useAppState();

  return (
    <div className="flex p-3 py-5 z-10 bg-secondary rounded-md">
      <div>
        <Switch
          aria-label={`${data}-switch`}
          checked={completed}
          onChange={() => {
            dispatch({
              type: 'CHANGE_COMPLETED',
              payload: {
                id,
                prev: completed,
              },
            });
          }}
          className={`${
            completed ? 'bg-blue-600' : 'bg-secondary'
          } inline-flex items-center h-6 rounded-full w-11`}
        >
          <span
            className={`${
              completed ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
      </div>
      <div className="px-3 break-all text-write" style={{ flex: 1 }}>
        {data}
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-write hover:text-white cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          data-testid="remove"
          onClick={() => {
            dispatch({ type: 'REMOVE_TODO', payload: id });
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};
