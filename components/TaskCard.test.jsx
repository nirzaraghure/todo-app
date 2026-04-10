import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {axe} from 'jest-axe';
import TaskCard from './TaskCard';
import '@testing-library/jest-dom/extend-expect';

describe('TaskCard component', () => {
  it('should delete a task with a valid index', async () => {
    const handleDelete = jest.fn();
    const { getByText, queryByText } = render(
      <TaskCard
        title="Task 1"
        tags={["Tag 1", "Tag 2"]}
        handleDelete={handleDelete}
        index={0}
      />
    );

    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(1));
    expect(handleDelete).toHaveBeenCalledWith(0);
  });

  it('should have no accessibility issues', async () => {
    const { container } = render(<TaskCard title="Task 1" tags={["Tag 1", "Tag 2"]} handleDelete={() => {}} index={0} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});