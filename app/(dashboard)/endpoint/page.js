"use client";

import { Container, Row, Col, Card, Alert, Spinner, Accordion } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Page() {
  const [routes, setRoutes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("/api/routes");
        if (!response.ok) throw new Error("Failed to fetch routes");
        const data = await response.json();
        setRoutes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRoutes();
  }, []);

  const groupByTag = (routes) => {
    const grouped = routes.reduce((acc, route) => {
      route.tags?.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push(route);
      });
      return acc;
    }, {});

    return grouped;
  };

  const groupedRoutes = routes ? groupByTag(routes) : null;

  return (
    <Container fluid className="p-5 bg-light">
      <header className="text-center mb-5">
        <h1 className="display-3 text-primary">Routes List</h1>
        <p className="lead text-muted">Daftar rute API yang tersedia di sistem.</p>
      </header>

      {error ? (
        <Alert variant="danger" className="text-center">{`Error: ${error}`}</Alert>
      ) : groupedRoutes ? (
        <div>
          {Object.keys(groupedRoutes).map((tag, idx) => (
            <Accordion key={idx} defaultActiveKey="0" className="mb-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>{tag}</Accordion.Header>
                <Accordion.Body>
                  <Row className="g-4">
                    {groupedRoutes[tag].map((route, routeIdx) => (
                      <Col sm={6} md={4} key={routeIdx}>
                        <Card className="shadow-sm">
                          <Card.Body>
                            <Card.Title>{route.name}</Card.Title>
                            <Card.Text>
                              <strong>Path:</strong> {route.path}
                              <br />
                              <strong>Parameters:</strong>
                              <Accordion>
                                {route.params.length > 0 ? (
                                  route.params.map((param, paramIdx) => (
                                    <Accordion.Item key={paramIdx} eventKey={String(paramIdx)}>
                                      <Accordion.Header>{param.name}</Accordion.Header>
                                      <Accordion.Body>
                                        {param.required ? 'Required' : 'Optional'}
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  ))
                                ) : (
                                  <Accordion.Item eventKey="0">
                                    <Accordion.Header>None</Accordion.Header>
                                    <Accordion.Body>No parameters</Accordion.Body>
                                  </Accordion.Item>
                                )}
                              </Accordion>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </Container>
  );
}
