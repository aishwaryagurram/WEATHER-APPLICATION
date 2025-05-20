import { useState, useEffect } from 'react';
import axios from 'axios';
import './ForecastDisplay.css';

const ForecastDisplay = ({ city, unit }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/weather/forecast/city/${city}`);
        setForecastData(response.data);
      } catch (err) {
        console.error('Error fetching forecast:', err);
        setError('Failed to load forecast data');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  if (loading) {
    return <div className="loading">Loading forecast...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!forecastData) {
    return null;
  }

  // Convert temperature based on selected unit
  const convertTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return ((temp * 9/5) + 32).toFixed(0);
    }
    return temp.toFixed(0);
  };

  // Group forecast data by day
  const groupForecastByDay = () => {
    const grouped = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString();
      
      if (!grouped[day]) {
        grouped[day] = [];
      }
      
      grouped[day].push(item);
    });
    
    // Get daily data (using noon forecast or the middle entry for each day)
    return Object.entries(grouped).map(([day, items]) => {
      // Try to get the forecast for noon, or use the middle item
      const middleIndex = Math.floor(items.length / 2);
      return items[middleIndex];
    }).slice(0, 5); // Limit to 5 days
  };

  const dailyForecast = groupForecastByDay();

  // Format date
  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, { weekday: 'short' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="forecast-display">
      <h2 className="forecast-title">5-Day Forecast</h2>
      <div className="forecast-container">
        {dailyForecast.map((item, index) => (
          <div className="forecast-item" key={index}>
            <div className="forecast-day">{formatDay(item.dt)}</div>
            <div className="forecast-date">{formatDate(item.dt)}</div>
            <img 
              className="forecast-icon"
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
            <div className="forecast-temp">
              {convertTemp(item.main.temp)}°{unit === 'celsius' ? 'C' : 'F'}
            </div>
            <div className="forecast-description">
              {item.weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
