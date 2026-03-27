```javascript
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './app';

describe('App component', () => {
  let tasks = [];
  let setTasks;
  let history;

  beforeEach(() => {
    localStorage.clear();
    history = createMemoryHistory();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('should delete the last task in a column', () => {
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const todoColumnTitle = getByText('To do');
    todoColumnTitle.click();

    const tasksArray = [
      { id: 1, title: 'Task 1', status: 'todo' },
      { id: 2, title: 'Task 2', status: 'todo' },
      { id: 3, title: 'Task 3', status: 'todo' },
    ];

    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    const taskColumn = getByText('Task 3');
    taskColumn.click();

    const deleteButton = getByText('Delete');
    deleteButton.click();

    await waitFor(() => expect(localStorage.getItem('tasks')).toEqual(JSON.stringify([tasksArray[0], tasksArray[1]])));
  });

  describe('handleDelete function', () => {
    beforeEach(() => {
      const { getByText } = render(<App />);
      setTasks = getByText('add task').closest('button').parentElement
        .querySelector('input').parentElement.querySelector('button')
        .closest('button').parentElement.querySelector('button')
        .closest('form').parentElement.querySelector('button').parentElement
        .querySelector('input');
      tasks = [{ id: 1, title: 'Task 1', status: 'todo' }];
      const task = getByText('Task 1');
      deleteButton = task.querySelector('button.delete');
    });

    it('should delete task from state array', () => {
      act(() => {
        task.click();
        fireEvent.click(deleteButton);
      });
      expect(setTasks).toHaveBeenCalledTimes(1);
      expect(setTasks).toHaveBeenCalledWith(tasks.filter((_, index) => index !== 0));
    });

    it('should update local storage', () => {
      act(() => {
        task.click();
        fireEvent.click(deleteButton);
      });
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(tasks.filter((_, index) => index !== 0)));
    });

    it('should delete the last task in a column', () => {
      const { getByText } = render(<App />);
      setTasks = getByText('add task').closest('button').parentElement
        .querySelector('input').parentElement.querySelector('button')
        .closest('button').parentElement.querySelector('button')
        .closest('form').parentElement.querySelector('button').parentElement
        .querySelector('input');
      tasks = [
        { id: 1, title: 'Task 1', status: 'todo' },
        { id: 2, title: 'Task 2', status: 'todo' },
        { id: 3, title: 'Task 3', status: 'todo' },
      ];
      const taskColumn = getByText('Task 3');
      taskColumn.click();
      const deleteButton = getByText('Delete');
      deleteButton.click();

      act(() => {
        taskColumn.click();
        fireEvent.click(deleteButton);
      });

      expect(setTasks).toHaveBeenCalledTimes(1);
      expect(setTasks).toHaveBeenCalledWith(tasks.filter((_, index) => index !== 2));
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(tasks.filter((_, index) => index !== 2)));
    });
  });
});
```