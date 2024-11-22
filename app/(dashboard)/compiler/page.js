'use client';

import { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';

const Compiler = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [language, setLanguage] = useState('python3');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [executeFlag, setExecuteFlag] = useState(false);

  useEffect(() => {
    if (!executeFlag) return;

    const handleExecute = async () => {
      setLoading(true);
      setError('');
      setOutput('');

      const postData = {
        source: sourceCode,
        lang: language,
      };

      try {
        const response = await fetch('/api/tools/compiler', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        const data = await response.json();
        setOutput(data.output || 'Execution completed with no output.');
      } catch (err) {
        setError('Error executing the code. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleExecute();
  }, [executeFlag, sourceCode, language]);

  const handleRunClick = () => {
    setExecuteFlag(true);
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white text-center">
              <h5>Code Editor</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formSourceCode">
                  <Form.Label className="fw-bold">Source Code</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    value={sourceCode}
                    onChange={(e) => setSourceCode(e.target.value)}
                    placeholder="Write your code here..."
                    className="font-monospace"
                  />
                </Form.Group>
                <Form.Group controlId="formLanguage" className="mt-3">
                  <Form.Label className="fw-bold">Programming Language</Form.Label>
                  <Form.Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="python3">Python 3</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                  </Form.Select>
                </Form.Group>
                <Button
                  variant="success"
                  className="mt-4 w-100"
                  onClick={handleRunClick}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Executing...
                    </>
                  ) : (
                    'Run Code'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-dark text-white text-center">
              <h5>Output</h5>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {!error && (
                <pre
                  className={`p-3 rounded ${
                    output ? 'bg-light text-dark' : 'bg-secondary text-white'
                  }`}
                  style={{ minHeight: '150px' }}
                >
                  {output || 'Output will be shown here.'}
                </pre>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Compiler;
