import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from '@storybook/testing-a11y';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import TaskCard from './TaskCard';

expect.extend({ toHaveNoViolations });

jest.mock('./Tag');

describe('TaskCard component', () => {
  it('should call handleDelete when delete button is clicked', () => {
    const handleDelete = jest.fn();
    const tags = ['tag1', 'tag2'];
    const { getByAltText } = render(<TaskCard title="Task title" tags={tags} handleDelete={handleDelete} index={0} />);
    const deleteIcon = getByAltText('delete');
    fireEvent.click(deleteIcon);
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(0);
  });

  it('should call handleDelete with correct index value when tags are present', () => {
    const handleDelete = jest.fn();
    const tags = ['tag1', 'tag2'];
    const { getByAltText } = render(<TaskCard title="Task title" tags={tags} handleDelete={handleDelete} index={0} />);
    const deleteIcon = getByAltText('delete');
    fireEvent.click(deleteIcon);
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(0);
  });

  it('should call handleDelete with correct index value when tags are empty', () => {
    const handleDelete = jest.fn();
    const tags = [];
    const { getByAltText } = render(<TaskCard title="Task title" tags={tags} handleDelete={handleDelete} index={0} />);
    const deleteIcon = getByAltText('delete');
    fireEvent.click(deleteIcon);
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(0);
  });

  it('should call handleDelete with correct index value when index is a negative number', () => {
    const handleDelete = jest.fn();
    const tags = ['tag1', 'tag2'];
    const { getByAltText } = render(<TaskCard title="Task title" tags={tags} handleDelete={handleDelete} index={-1} />);
    const deleteIcon = getByAltText('delete');
    fireEvent.click(deleteIcon);
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(-1);
  });

  it('should call handleDelete with correct index value when index is a large number', () => {
    const handleDelete = jest.fn();
    const tags = ['tag1', 'tag2'];
    const { getByAltText } = render(<TaskCard title="Task title" tags={tags} handleDelete={handleDelete} index={1000} />);
    const deleteIcon = getByAltText('delete');
    fireEvent.click(deleteIcon);
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(1000);
  });

  it('should not call handleDelete when delete button is not clicked', () => {
    const handleDelete = jest.fn();
    const tags = ['tag1', 'tag2'];
    const { getByAltText } = render(<TaskCard title="Task title" tags={tags} handleDelete={handleDelete} index={0} />);
    const deleteIcon = getByAltText('delete');
    expect(handleDelete).not.toHaveBeenCalled();
  });

  it('should pass accessibility test', async () => {
    const { container } = render(<TaskCard title="Task title" tags={[]} handleDelete={() => {}} index={0} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});