import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TaskCard from './TaskCard';

describe('TaskCard component', () => {
  it('should call handleDelete function when delete button is clicked', async () => {
    const handleDelete = jest.fn();
    const { getByText } = render(
      <Router>
        <TaskCard title="Test Task" tags={[]} handleDelete={handleDelete} index={0} />
      </Router>
    );

    const deleteButton = getByText('');
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(0);
  });

  it('should remove task from the list when handleDelete function is called', async () => {
    const handleDelete = jest.fn();
    const { getByText, queryByText } = render(
      <Router>
        <TaskCard title="Test Task" tags={[]} handleDelete={handleDelete} index={0} />
      </Router>
    );

    expect(getByText('Test Task')).toBeInTheDocument();

    const deleteButton = getByText('');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(queryByText('Test Task')).not.toBeInTheDocument();
    });

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(0);
  });
});