// Product.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import Product from './../src/components/Product';

describe('Product', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Product page', route);
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/product/:productId" element={ui} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('displays loading component while fetching data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    renderWithRouter(<Product />, { route: '/product/1' });

    await waitFor(() =>
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    );
  });

  test('displays product details after successful fetch', async () => {
    const product = {
      id: 1,
      name: 'Product 1',
      data: { price: '$100' },
    };
    fetchMock.mockResponseOnce(JSON.stringify(product));

    renderWithRouter(<Product />, { route: '/product/1' });

    await waitFor(() =>
      expect(screen.getByText('Product 1')).toBeInTheDocument()
    );
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Buy now')).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    fetchMock.mockReject(new Error('API failure'));

    renderWithRouter(<Product />, { route: '/product/1' });

    await waitFor(() =>
      expect(
        screen.getByText('Something went wrong, please try again')
      ).toBeInTheDocument()
    );
  });
});
