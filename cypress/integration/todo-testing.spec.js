describe('Cypress Testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos', {
      fixture: 'todos.json',
    });
  });

  it('should display text', () => {
    cy.findByText(/todo/i);
    cy.findByPlaceholderText(/create a new todo/i)
      .type('hello')
      .type('{enter}')
      .should('have.value', '');
  });

  it('should create a todo', () => {
    cy.findByRole('textbox', { name: 'todoInput' })
      .type('Buy Milk')
      .type('{enter}')
      .should('have.value', '');

    cy.findByText(/buy milk/i);
  });

  it('should be deleted', () => {
    cy.findByRole('textbox', { name: 'todoInput' })
      .type('Buy Milk')
      .type('{enter}')
      .should('have.value', '');

    cy.findByText(/buy milk/i);

    cy.findByRole('textbox', { name: 'todoInput' })
      .type('Go Jogging')
      .type('{enter}')
      .should('have.value', '');

    cy.findByText(/go jogging/i);

    cy.findAllByTestId('remove').should('have.length', 202);

    cy.get(':nth-child(1) > :nth-child(3) > [data-testid=remove]').click();

    cy.findByText(/go joggind/i).should('not.exist');

    cy.get(':nth-child(1) > :nth-child(3) > [data-testid=remove]').click();

    cy.findByText(/buy milk/i).should('not.exist');
  });

  it('should show correct items left', () => {
    cy.findByText(/110 items left/i);

    cy.get('#headlessui-switch-3').click();

    cy.findByText(/109 items left/i);
  });

  it('should show correct items in completed', () => {
    cy.findByText(/completed/i).click();

    cy.findByText(/0 items left/i);
  });
});
