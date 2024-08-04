import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { iProduct } from '../types';

const List = (props: { products: Array<iProduct> }) => {
  const { products } = props;

  const navigate = useNavigate();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <tr
              key={product.id}
              style={{ cursor: 'pointer' }}
              role="button"
              onClick={() => {
                navigate(`product/${product.id}`);
              }}
            >
              <td>{product.name}</td>
              <td>{product.data?.price}</td>
              <td>{product.data?.color}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default List;
