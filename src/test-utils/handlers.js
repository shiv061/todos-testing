import { rest } from 'msw';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', title: 'Buy Milk', completed: false },
        { id: '2', title: 'Buy Bread', completed: true },
        { id: '3', title: 'Buy Shoe', completed: false },
      ])
    );
  }),
];
