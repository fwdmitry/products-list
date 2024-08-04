import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Product from './components/Product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="product/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
