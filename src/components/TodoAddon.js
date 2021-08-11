import { useMemo } from 'react';
import { useAppState } from '../hooks/useAppState';

export const TodoAddon = () => {
  const {
    dispatch,
    state: { todos },
  } = useAppState();

  const leftTodos = useMemo(() => {
    return todos.filter((todo) => !todo.completed);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.completed);
  }, [todos]);

  return (
    <div>
      <div className="bg-secondary p-3 flex justify-between rounded-bl-md rounded-br-md">
        <span className="text-write">{leftTodos.length} items left</span>
        {completedTodos.length ? (
          <span
            className="text-write cursor-pointer hover:text-white"
            onClick={() => {
              dispatch({ type: 'CLEAR_COMPLETED' });
            }}
          >
            Clear completed
          </span>
        ) : null}
      </div>
    </div>
  );
};
