// imports
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import App from './app';

// test file
describe('handleDelete function', () => {
  let tasks = [];
  let setTasks;
  let deleteButton;
  let task;

  beforeEach(() => {
    // render App component
    const { getByText } = render(<App />);
    // get setTasks function from App context
    setTasks = getByText('add task').closest('button').parentElement
      .querySelector('input').parentElement.querySelector('button')
      .closest('button').parentElement.querySelector('button')
      .closest('form').parentElement.querySelector('button').parentElement
      .querySelector('input');
    task = getByText('task 1');
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
});