import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClotheCustomisation from '../components/ClotheCustomisation/ClotheCustomisation';

describe('ClotheCustomisation', () => {
  it('should render the component with the correct name', () => {
    const { getByText } = render(
      <ClotheCustomisation selectedItemAttribute={['item1', 'item2']} name="Test Name" />
    );
    expect(getByText('Test Name')).toBeInTheDocument();
  });

  it('should call setFunction when an item is selected', () => {
    const mockSetFunction = jest.fn();
    const { getByText } = render(
      <ClotheCustomisation selectedItemAttribute={['item1', 'item2']} name="Test Name" setFunction={mockSetFunction} />
    );

    fireEvent.click(getByText('item1'));
    expect(mockSetFunction).toHaveBeenCalledWith('item1');
  });
});
