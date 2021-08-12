import { useEffect } from 'react';
import { Container } from './components/Container';
import Loader from './components/Loader';
import { useAppState } from './hooks/useAppState';

function App() {
  const {
    state: { dark, loading },
    dispatch,
  } = useAppState();

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    dispatch({ type: 'SET_LOADER', payload: true });
    try {
      const todos = await fetch('https://jsonplaceholder.typicode.com/todos');
      const todosJson = await todos.json();
      const todosResult = todosJson.map((todo) => ({
        id: todo.id,
        data: todo.title,
        completed: todo.completed,
      }));
      dispatch({ type: 'SET_TODOS', payload: todosResult });
      dispatch({ type: 'SET_LOADER', payload: false });
      return todosResult;
    } catch (error) {
      dispatch({ type: 'SET_LOADER', payload: false });
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="grid grid-cols-1 grid-rows-3 h-full relative">
        <div className="row-span-1 gradient_background" />
        <div
          className={`row-span-2 flex flex-row justify-center animate ${
            dark ? 'bg-primary' : 'bg-white'
          }`}
        >
          {loading ? <Loader /> : null}
          <Container />
        </div>
      </div>
    </div>
  );
}

export default App;
