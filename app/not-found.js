'use client'
import { Col, Row, Image, Container } from 'react-bootstrap';
import Link from 'next/link';
import useMounted from 'hooks/useMounted';
import { Fragment } from 'react';

const NotFound = () => {
  const hasMounted = useMounted();
  return (
    <Fragment>
      {hasMounted &&
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Row className="text-center">
            <Col sm={12}>
              <div>
                <div className="mb-4">
                  <Image src="/images/error/404-error-img.png" alt="404 error" className="img-fluid" />
                </div>
                <h1 className="display-3 text-primary fw-bold">Oops! The page was not found.</h1>
                <p className="mb-4 text-muted">The page you are looking for might have been moved or deleted.</p>
                <Link href="/" className="btn btn-lg btn-outline-primary">
                  Go Home
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      }
    </Fragment>
  );
};

export default NotFound;
