import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Loading from './Loading';
import { eStatus, iProduct } from '../types';

const Product = () => {
  const [status, setStatus] = useState<eStatus>(eStatus.idle);
  const [prodcut, setProduct] = useState<iProduct>();

  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      setStatus(eStatus.loading);
      fetch(`https://api.restful-api.dev/objects/${productId}`)
        .then((response) => response.json())
        .then((json) => {
          setProduct(json);
          setStatus(eStatus.success);
        })
        .catch(() => {
          setStatus(eStatus.failed);
        });
    }
  }, [productId]);

  if (status === eStatus.failed) {
    return <>Something went wrong, please try again</>;
  }

  if (status === eStatus.loading) {
    return <Loading />;
  }

  return (
    prodcut && (
      <Container>
        <a href="/">&lt; Back</a>
        <Row>
          <Col>
            <h1>{prodcut.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col md="6" className="d-flex justify-content-center mt-md-5">
            <img src="https://via.assets.so/img.jpg?w=400&h=400&tc=silver&bg=%23ececec&t=Product" />
          </Col>
          <Col md="6" className="mt-md-5">
            <h6 className="my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
              efficitur nisl. Fusce dictum tincidunt purus non viverra. Etiam
              volutpat maximus diam, et imperdiet arcu. Nulla at sem a justo
              aliquam sollicitudin. Etiam lobortis, orci vel tempor tempus,
              neque orci aliquam felis, nec luctus erat libero a turpis. Proin
              efficitur eget ex nec luctus. Curabitur pharetra consectetur
              magna, ac tincidunt dui laoreet nec. Sed finibus ut magna faucibus
              ultrices. Donec non lectus dui.
            </h6>
            {prodcut.data?.price && (
              <>
                <h3>{prodcut.data.price}</h3>
                <div className="d-grid gap-2">
                  <Button size="lg">Buy now</Button>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Product;
