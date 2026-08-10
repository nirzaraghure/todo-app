import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskCard from './TaskCard';
import { MemoryRouter } from 'react-router-dom';

describe('TaskCard component', () => {
  it('should handle delete event when index is within bounds', () => {
    const handleDelete = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <TaskCard title="Test Task" tags={['tag1', 'tag2']} handleDelete={handleDelete} index={0} />
      </MemoryRouter>
    );

    const deleteButton = getByText('');
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(0);
  });

  it('should not handle delete event when index is out of bounds', () => {
    const handleDelete = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <TaskCard title="Test Task" tags={['tag1', 'tag2']} handleDelete={handleDelete} index={10} />
      </MemoryRouter>
    );

    const deleteButton = getByText('');
    fireEvent.click(deleteButton);

    expect(handleDelete).not.toHaveBeenCalled();
  });
});