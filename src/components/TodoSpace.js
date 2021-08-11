import { useAppState } from '../hooks/useAppState';
import { Todo } from './Todo';

export const TodoSpace = () => {
  const {
    state: { todos },
  } = useAppState();
  console.log(todos);
  return (
    <div className="rounded-md bg-secondary">
      <div>
        {todos?.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            data={todo.data}
            completed={todo.completed}
          />
        ))}
      </div>
    </div>
  );
};
