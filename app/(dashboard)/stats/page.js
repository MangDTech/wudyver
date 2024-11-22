"use client";

import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Page() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/general/system-stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data.Statistik);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container fluid className="p-5 bg-light">
      <header className="text-center mb-5">
        <h1 className="display-3 text-primary">System Stats</h1>
        <p className="lead text-muted">Monitor status sistem Anda secara real-time.</p>
      </header>

      {error ? (
        <Alert variant="danger">{`Error: ${error}`}</Alert>
      ) : stats ? (
        <Row className="g-4">
          <Col sm={6} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Memory</Card.Title>
                <Card.Text>
                  <strong>Total:</strong> {stats.Memory.total}
                  <br />
                  <strong>Used:</strong> {stats.Memory.used}
                  <br />
                  <strong>Free:</strong> {stats.Memory.free}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Uptime</Card.Title>
                <Card.Text>{stats.Uptime}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Platform</Card.Title>
                <Card.Text>{stats.Platform}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Architecture</Card.Title>
                <Card.Text>{stats.Architecture}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Node.js Version</Card.Title>
                <Card.Text>{stats.NodeVersion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </Container>
  );
}
