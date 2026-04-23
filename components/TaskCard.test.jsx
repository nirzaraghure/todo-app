import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from './TaskCard';

describe('Testing the TaskCard component', () => {
  let mockHandleDelete;
  
  beforeEach(() => {
    mockHandleDelete = jest.fn();
  });
  
  it('should call handleDelete function when delete icon is clicked', () => {
    const { getByRole } = render(<TaskCard title="Test Task" tags={['Tag1', 'Tag2']} handleDelete={mockHandleDelete} index={0}/>);
    
    userEvent.click(getByRole('button')); // Assuming the delete icon has role of button
  
    expect(mockHandleDelete).toHaveBeenCalled();
  });
});