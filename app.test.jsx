import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './app';
import { act } from 'react-dom/test-utils';

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('should delete the last task in a column', () => {
    const { getByText } = render(
      <Router history={createMemoryHistory()}>
        <App />
      </Router>
    );

    const todoColumnTitle = getByText('To do');
    todoColumnTitle.click();

    const tasks = [
      { id: 1, title: 'Task 1', status: 'todo' },
      { id: 2, title: 'Task 2', status: 'todo' },
      { id: 3, title: 'Task 3', status: 'todo' },
    ];

    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskColumn = getByText('Task 3');
    taskColumn.click();

    const deleteButton = getByText('Delete');
    deleteButton.click();

    await waitFor(() => expect(localStorage.getItem('tasks')).toEqual(JSON.stringify([tasks[0], tasks[1]])));
  });
});