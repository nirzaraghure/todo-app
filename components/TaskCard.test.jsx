import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import TaskCard from './TaskCard';

describe('TaskCard component', () => {
  it('should handle delete functionality correctly', () => {
    const handleDeleteMock = jest.fn();
    const { getByText } = render(
      <TaskCard
        title="Test Task"
        tags={['tag1', 'tag2']}
        handleDelete={handleDeleteMock}
        index={0}
      />
    );

    fireEvent.click(getByText(''));

    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
    expect(handleDeleteMock).toHaveBeenCalledWith(0);

    handleDeleteMock.mockReset();

    const taskCard = render(
      <TaskCard
        title="Test Task"
        tags={['tag1', 'tag2']}
        handleDelete={handleDeleteMock}
        index={0}
      />
    );

    fireEvent.click(getByText(''));

    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
    expect(handleDeleteMock).toHaveBeenCalledWith(0);

    handleDeleteMock.mockReset();

    render(
      <TaskCard
        title="Test Task"
        tags={['tag1', 'tag2']}
        handleDelete={handleDeleteMock}
        index={0}
      />
    );

    fireEvent.click(getByText(''));

    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
    expect(handleDeleteMock).toHaveBeenCalledWith(0);

    handleDeleteMock.mockReset();

    render(
      <TaskCard
        title="Test Task"
        tags={['tag1', 'tag2']}
        handleDelete={handleDeleteMock}
        index={-1}
      />
    );

    expect(() => {
      fireEvent.click(getByText(''));
    }).toThrowError("Index must be a non-negative integer");

    handleDeleteMock.mockReset();

    render(
      <TaskCard
        title="Test Task"
        tags={['tag1', 'tag2']}
        handleDelete={handleDeleteMock}
        index={null}
      />
    );

    expect(() => {
      fireEvent.click(getByText(''));
    }).toThrowError("Index must be a non-negative integer");

    handleDeleteMock.mockReset();
  });
});