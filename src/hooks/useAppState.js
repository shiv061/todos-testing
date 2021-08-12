import {
  createContext,
  useReducer,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import produce from 'immer';
import { v4 } from 'uuid';

const AppContext = createContext(null);

const initialState = {
  todos: [],
  filter: 'all',
  originalTodos: [],
  dark: true,
  loading: false,
  error: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const id = v4();
      const todoData = {
        id,
        data: action.payload.data,
        completed: action.payload.completed,
      };
      state.todos.unshift(todoData);
      state.originalTodos.unshift(todoData);
      break;
    }
    case 'CHANGE_COMPLETED': {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[todoIndex].completed = !action.payload.prev;
      state.originalTodos[todoIndex].completed = !action.payload.prev;
      break;
    }
    case 'REMOVE_TODO': {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = newTodos;
      state.originalTodos = newTodos;
      break;
    }
    case 'FILTER': {
      const filterType = action.payload;
      state.filter = filterType;
      if (filterType === 'all') {
        state.todos = state.originalTodos;
      } else if (filterType === 'active') {
        state.todos = state.originalTodos.filter((todo) => !todo.completed);
      } else if (filterType === 'completed') {
        state.todos = state.originalTodos.filter((todo) => todo.completed);
      }
      break;
    }
    case 'CHANGE_THEME': {
      state.dark = !state.dark;
      break;
    }
    case 'CLEAR_COMPLETED': {
      const newTodos = state.originalTodos.filter((todo) => !todo.completed);
      state.todos = newTodos;
      state.originalTodos = newTodos;
      break;
    }
    case 'SET_LOADER': {
      state.loading = action.payload;
      break;
    }
    case 'SET_ERROR': {
      state.error = action.payload;
      break;
    }
    case 'SET_TODOS': {
      state.todos = action.payload;
      state.originalTodos = action.payload;
      break;
    }
    default: {
      return state;
    }
  }
};

const curriedReducer = produce(appReducer);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(curriedReducer, initialState);

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      dispatch({ type: 'SET_ERROR', payload: null });
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.error]);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};
