'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Alert, Dropdown, DropdownButton, Card } from 'react-bootstrap';

const UploadPage = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch('/api/tools/upload');
        const data = await res.json();
        setProviders(data.providers);
        setSelectedProvider(data.providers[0]);
      } catch (error) {
        setMessage('Failed to load providers');
      }
    };

    fetchProviders();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedProvider) return;

    setIsUploading(true);
    setMessage('');
    setUploadResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('option', providers.indexOf(selectedProvider) + 1);

    try {
      const res = await fetch('/api/tools/upload?option=' + (providers.indexOf(selectedProvider) + 1), {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const result = await res.json();
      setMessage('Upload successful!');
      setUploadResult(result);
    } catch (error) {
      setMessage('Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center flex-column">
      <h2 className="text-center mb-4">Upload Media</h2>
      <form onSubmit={handleUpload} className="w-50">
        <div className="mb-3">
          <label className="form-label">Select Provider</label>
          <DropdownButton
            variant="secondary"
            title={selectedProvider || 'Choose Provider'}
            onSelect={(provider) => setSelectedProvider(provider)}
            className="w-100"
          >
            {providers.map((provider, idx) => (
              <Dropdown.Item key={idx} eventKey={provider}>
                {provider}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <Button variant="primary" type="submit" disabled={isUploading} className="w-100">
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
      {message && <Alert variant={isUploading ? 'info' : 'success'} className="mt-3 w-50">{message}</Alert>}

      {uploadResult && uploadResult.result && (
        <div className="mt-3 w-50">
          <Card>
            <Card.Body>
              <Card.Title>Upload Result</Card.Title>
              <Card.Text>
                <a href={uploadResult.result} target="_blank" rel="noopener noreferrer">
                  {uploadResult.result}
                </a>
              </Card.Text>
              <Button
                variant="success"
                href={uploadResult.result}
                download
                className="mt-2"
              >
                Download
              </Button>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Response Data</Card.Title>
              <pre>{JSON.stringify(uploadResult, null, 2)}</pre>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
