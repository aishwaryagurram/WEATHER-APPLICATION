import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay/ForecastDisplay';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  // Set API base URL from environment variable
  useEffect(() => {
    // Set default API URL if not defined in .env
    if (!import.meta.env.VITE_API_URL) {
      window.VITE_API_URL = 'http://localhost:5000';
    }
  }, []);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);

    try {
      let response;

      switch (searchParams.type) {
        case 'city':
          response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/weather/city/${searchParams.query}`);
          setLastSearchedCity(searchParams.query);
          break;

        case 'zip':
          response = await axios.get(
            `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/weather/zip/${searchParams.query}`,
            { params: { countryCode: searchParams.countryCode } }
          );
          setLastSearchedCity(response.data.name);
          break;

        case 'coordinates':
          response = await axios.get(
            `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/weather/coordinates`,
            { params: { lat: searchParams.query.lat, lon: searchParams.query.lon } }
          );
          setLastSearchedCity(response.data.name);
          break;

        default:
          throw new Error('Invalid search type');
      }

      setWeatherData(response.data);
    } catch (err) {
      console.error('Error fetching weather data:', err);

      if (err.response && err.response.status === 404) {
        setError('Location not found. Please try another search.');
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }

      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <div className="container">
          <SearchBar onSearch={handleSearch} isLoading={loading} />

          {loading && (
            <div className="loading">Loading weather data...</div>
          )}

          {error && (
            <div className="error">{error}</div>
          )}

          {weatherData && (
            <>
              <WeatherDisplay
                weatherData={weatherData}
                unit={unit}
                onUnitChange={setUnit}
              />

              {lastSearchedCity && (
                <ForecastDisplay
                  city={lastSearchedCity}
                  unit={unit}
                />
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App
