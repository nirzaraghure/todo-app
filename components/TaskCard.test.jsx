import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskCard from './TaskCard';

describe('TaskCard component', () => {
  it('should handle delete index edge case', () => {
    const handleDelete = jest.fn();
    const title = 'Test Task';
    const tags = ['tag1', 'tag2'];
    const index = -1;

    const { getByText } = render(
      <TaskCard title={title} tags={tags} handleDelete={handleDelete} index={index} />
    );

    const deleteIcon = getByText('');
    expect(deleteIcon).toBeInTheDocument();

    fireEvent.click(deleteIcon);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(index);
  });
});