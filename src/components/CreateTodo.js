import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { useAppState } from '../hooks/useAppState';

export const CreateTodo = () => {
  const [enabled, setEnabled] = useState(false);
  const [todo, setTodo] = useState('');

  const { dispatch } = useAppState();

  const handleAddTodo = () => {
    if (!todo) return;
    dispatch({
      type: 'ADD_TODO',
      payload: {
        data: todo,
        completed: enabled,
      },
    });
    setTodo('');
  };

  return (
    <div className="w-full relative flex items-center p-3 bg-secondary rounded-md">
      <div className="bg-secondary">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-blue-600' : 'bg-secondary'
          } inline-flex items-center h-6 rounded-full w-11`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
      </div>
      <input
        autoComplete="off"
        aria-label="todoInput"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo();
          }
        }}
        className="w-full bg-secondary rounded-md pl-4 outline-none text-white"
        placeholder="Create a new todo"
      ></input>
    </div>
  );
};
