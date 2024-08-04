import { useEffect, useState } from 'react';
import List from './List';
import { Container, Row } from 'react-bootstrap';
import Loading from './Loading';
import { eStatus, iProduct } from '../types';

function Dashboard() {
  const [status, setStatus] = useState<eStatus>(eStatus.idle);
  const [products, setProducts] = useState<Array<iProduct>>([]);

  useEffect(() => {
    setStatus(eStatus.loading);
    fetch('https://api.restful-api.dev/objects')
      .then((response) => response.json())
      .then((json) => {
        setProducts(json);
        setStatus(eStatus.success);
      })
      .catch(() => {
        setStatus(eStatus.failed);
      });
  }, []);

  if (status === eStatus.failed) {
    return <>Something went wrong, please try again</>;
  }

  return (
    <>
      <Container>
        {status === eStatus.loading ? (
          <Loading />
        ) : (
          <>
            <Row className="my-2">
              <h3>Available products</h3>
            </Row>
            <List products={products} />
          </>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
