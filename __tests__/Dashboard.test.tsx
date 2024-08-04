import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './../src/components/Dashboard';
import fetchMock from 'jest-fetch-mock';

jest.mock('./../src/components/List', () => () => <div>List component</div>);

describe('Dashboard', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('displays loading component while fetching data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    render(<Dashboard />);

    await waitFor(() =>
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    );
  });

  test('displays products list after successful fetch', async () => {
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(products));

    render(<Dashboard />);

    await waitFor(() =>
      expect(screen.getByText('Available products')).toBeInTheDocument()
    );
    expect(screen.getByText('List component')).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    fetchMock.mockReject(new Error('API failure'));

    render(<Dashboard />);

    await waitFor(() =>
      expect(
        screen.getByText('Something went wrong, please try again')
      ).toBeInTheDocument()
    );
  });
});
