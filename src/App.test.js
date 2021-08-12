import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from './test-utils';
import { rest } from 'msw';
import App from './App';
import userEvent from '@testing-library/user-event';
import { server } from './test-utils/server';

test('renders learn react link', () => {
  render(<App />);
  const todoElement = screen.getByText(/todo/i);
  expect(todoElement).toBeInTheDocument();
});

describe('test todo functionality', () => {
  test('todo is created', () => {
    render(<App />);
    const todoInputElement = screen.getByPlaceholderText(/create a new todo/i);

    const todo = 'Buy Milk';

    userEvent.type(todoInputElement, todo);
    userEvent.keyboard('{enter}');

    const todoElemet = screen.getByText(todo);

    expect(todoElemet).toBeInTheDocument();
  });

  test('todo is created then deleted', () => {
    render(<App />);

    const todo1 = 'Buy Milk';
    const todo2 = 'Go Jogging';

    const todoInputElement = screen.getByRole('textbox', { name: 'todoInput' });

    userEvent.type(todoInputElement, todo1);
    userEvent.keyboard('{enter}');
    userEvent.type(todoInputElement, todo2);
    userEvent.keyboard('{enter}');

    expect(screen.getByText(todo1)).toBeInTheDocument();
    expect(screen.getByText(todo2)).toBeInTheDocument();

    const removeIcons = screen.getAllByTestId('remove');

    const [remove1, remove2] = removeIcons.reverse();

    userEvent.click(remove1);

    expect(screen.queryByText(todo1)).not.toBeInTheDocument();

    userEvent.click(remove2);

    expect(screen.queryByText(todo2)).not.toBeInTheDocument();
  });

  test('task completed is working OK', () => {
    render(<App />);

    const todo1 = 'Buy Milk';
    const todoInputElement = screen.getByRole('textbox', { name: 'todoInput' });

    userEvent.type(todoInputElement, todo1);
    userEvent.keyboard('{enter}');

    const itemsLeft = screen.getByText('1 items left');

    expect(itemsLeft).toBeInTheDocument();

    const switchElement = screen.getByRole('switch', {
      name: `${todo1}-switch`,
    });

    userEvent.click(switchElement);

    const itemsLeft2 = screen.getByText('0 items left');
    expect(itemsLeft2).toBeInTheDocument();
  });
});

describe('test server response', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('data is coming from the server', async () => {
    render(<App />);

    const todo1 = 'Buy Milk';
    const todo2 = 'Buy Bread';
    const todo3 = 'Buy Shoe';

    const todoEl1 = await waitFor(() => screen.getByText(todo1));
    const todoEl2 = await waitFor(() => screen.getByText(todo2));
    const todoEl3 = await waitFor(() => screen.getByText(todo3));

    expect(todoEl1).toBeInTheDocument();
    expect(todoEl2).toBeInTheDocument();
    expect(todoEl3).toBeInTheDocument();
  });

  test('handle server error', async () => {
    server.resetHandlers(
      rest.get(
        'https://jsonplaceholder.typicode.com/todos',
        (req, res, ctx) => {
          return res(ctx.status(401));
        }
      )
    );

    await waitFor(async () => {
      render(<App />);

      const todo1 = 'Buy Milk';
      const todo2 = 'Buy Bread';
      const todo3 = 'Buy Shoe';

      const todoEl1 = await waitFor(() => screen.queryByText(todo1));
      const todoEl2 = await waitFor(() => screen.queryByText(todo2));
      const todoEl3 = await waitFor(() => screen.queryByText(todo3));

      expect(todoEl1).not.toBeInTheDocument();
      expect(todoEl2).not.toBeInTheDocument();
      expect(todoEl3).not.toBeInTheDocument();
    });
  });
});
