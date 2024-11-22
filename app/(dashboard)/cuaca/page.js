'use client';

import { useState, useEffect } from 'react';
import { Card, Alert, Spinner, Form, Button, Image } from 'react-bootstrap';

const WeatherInfo = ({ weather }) => {
  const { location, current } = weather;
  const { condition, temp_c, temp_f, humidity, wind_mph, wind_kph, pressure_mb, precip_mm, feelslike_c, feelslike_f, cloud, uv, gust_mph, gust_kph, iconUrl, wind_dir, vis_km, vis_miles, tileUrl } = current;

  return (
    <Card className="m-5 shadow-lg">
      <Card.Body>
        <Card.Title className="text-center mb-3">
          {location.name}, {location.region}, {location.country}
        </Card.Title>
        
        {tileUrl && <Image src={tileUrl} alt="Weather Tile" style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '20px' }} />}
        
        <div className="d-flex align-items-center justify-content-center mb-3">
          {iconUrl && <Image src={iconUrl} alt={condition.text} style={{ width: '50px', height: '50px', marginRight: '15px' }} />}
          <div>
            <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
              <strong>Condition:</strong> {condition.text}
            </Card.Text>
            <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
              <strong>Temperature:</strong> {temp_c}°C / {temp_f}°F
            </Card.Text>
          </div>
        </div>

        <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          <strong>Feels Like:</strong> {feelslike_c}°C / {feelslike_f}°F
        </Card.Text>
        <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          <strong>Humidity:</strong> {humidity}%
        </Card.Text>
        <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          <strong>Cloudiness:</strong> {cloud}%
        </Card.Text>
        <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          <strong>Wind Speed:</strong> {wind_kph} km/h ({wind_mph} mph)
        </Card.Text>
        <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          <strong>Wind Gusts:</strong> {gust_kph} km/h ({gust_mph} mph)
        </Card.Text>
        <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          <strong>Wind Direction:</strong> {wind_dir}
        </Card.Text>
        <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          <strong>Pressure:</strong> {pressure_mb} mb
        </Card.Text>
        <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          <strong>Precipitation:</strong> {precip_mm} mm / {precip_in} inches
        </Card.Text>
        <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          <strong>Visibility:</strong> {vis_km} km / {vis_miles} miles
        </Card.Text>
        <Card.Text className="text-center" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          <strong>UV Index:</strong> {uv}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default function Page() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const baseURL = '';

  const fetchWeather = async (city) => {
    const url = `${baseURL}/api/info/cuaca?kota=${city}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!city) return;

    setLoading(true);
    setError(false);
    const data = await fetchWeather(city);
    if (data) {
      setWeather(data);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (city) {
      setLoading(true);
      setError(false);
      fetchWeather(city)
        .then(data => {
          if (data) {
            setWeather(data);
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [city]);

  if (loading) {
    return (
      <Alert variant="info" className="m-5 text-center">
        <Spinner animation="border" variant="info" /> Loading weather data...
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-5 text-center">
        Unable to fetch weather data. Please try again later.
      </Alert>
    );
  }

  return (
    <div className="container">
      <Form onSubmit={handleFormSubmit} className="m-5">
        <Form.Group controlId="cityInput">
          <Form.Label className="h4">Enter City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Get Weather
        </Button>
      </Form>

      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
}
