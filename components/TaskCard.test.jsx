import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskCard from './TaskCard';
import { MockStore } from './__mocks__/store';

describe('TaskCard component', () => {
  it('should render TaskCard component without crashing', () => {
    const { getByText } = render(<TaskCard title="Test Task" tags={['tag1', 'tag2']} handleDelete={() => {}} />);
    expect(getByText('Test Task')).toBeInTheDocument();
  });

  it('should handle empty title prop', () => {
    const { getByText } = render(<TaskCard title="" tags={['tag1', 'tag2']} handleDelete={() => {}} />);
    expect(getByText('No Title')).toBeInTheDocument();
  });

  it('should render delete icon and call handleDelete on click', () => {
    const handleDelete = jest.fn();
    const { getByText } = render(<TaskCard title="Test Task" tags={['tag1', 'tag2']} handleDelete={handleDelete} />);
    const deleteIcon = getByText('Delete');
    fireEvent.click(deleteIcon);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});