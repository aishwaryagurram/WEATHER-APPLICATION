import { useState } from 'react';
import { 
  WiHumidity, 
  WiStrongWind, 
  WiBarometer, 
  WiSunrise, 
  WiSunset, 
  WiThermometer 
} from 'react-icons/wi';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData }) => {
  const [unit, setUnit] = useState('celsius');

  if (!weatherData) return null;

  const {
    name,
    sys: { country, sunrise, sunset },
    weather,
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
    dt
  } = weatherData;

  // Convert temperature based on selected unit
  const convertTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return ((temp * 9/5) + 32).toFixed(1);
    }
    return temp.toFixed(1);
  };

  // Convert wind speed to mph if using Fahrenheit
  const convertWindSpeed = (speed) => {
    if (unit === 'fahrenheit') {
      // Convert from m/s to mph
      return (speed * 2.237).toFixed(1);
    }
    // Keep as m/s for Celsius
    return speed.toFixed(1);
  };

  // Format time from Unix timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-display">
      <div className="weather-card">
        <div className="weather-header">
          <div className="weather-location">
            {name}, {country}
          </div>
          <div className="weather-date">
            {formatDate(dt)}
          </div>
        </div>

        <div className="weather-main">
          <div className="weather-temp">
            {convertTemp(temp)}°{unit === 'celsius' ? 'C' : 'F'}
          </div>
          <div className="weather-icon">
            <img src={iconUrl} alt={weather[0].description} />
            <div className="weather-description">
              {weather[0].description}
            </div>
          </div>
        </div>

        <div className="weather-details">
          <div className="weather-detail-item">
            <div className="weather-detail-icon">
              <WiThermometer />
            </div>
            <div>
              <div className="weather-detail-label">Feels Like</div>
              <div className="weather-detail-value">
                {convertTemp(feels_like)}°{unit === 'celsius' ? 'C' : 'F'}
              </div>
            </div>
          </div>

          <div className="weather-detail-item">
            <div className="weather-detail-icon">
              <WiHumidity />
            </div>
            <div>
              <div className="weather-detail-label">Humidity</div>
              <div className="weather-detail-value">{humidity}%</div>
            </div>
          </div>

          <div className="weather-detail-item">
            <div className="weather-detail-icon">
              <WiStrongWind />
            </div>
            <div>
              <div className="weather-detail-label">Wind Speed</div>
              <div className="weather-detail-value">
                {convertWindSpeed(speed)} {unit === 'celsius' ? 'm/s' : 'mph'}
              </div>
            </div>
          </div>

          <div className="weather-detail-item">
            <div className="weather-detail-icon">
              <WiBarometer />
            </div>
            <div>
              <div className="weather-detail-label">Pressure</div>
              <div className="weather-detail-value">{pressure} hPa</div>
            </div>
          </div>

          <div className="weather-detail-item">
            <div className="weather-detail-icon">
              <WiSunrise />
            </div>
            <div>
              <div className="weather-detail-label">Sunrise</div>
              <div className="weather-detail-value">{formatTime(sunrise)}</div>
            </div>
          </div>

          <div className="weather-detail-item">
            <div className="weather-detail-icon">
              <WiSunset />
            </div>
            <div>
              <div className="weather-detail-label">Sunset</div>
              <div className="weather-detail-value">{formatTime(sunset)}</div>
            </div>
          </div>
        </div>

        <div className="unit-toggle">
          <button 
            className={unit === 'celsius' ? 'active' : ''}
            onClick={() => setUnit('celsius')}
          >
            °C
          </button>
          <button 
            className={unit === 'fahrenheit' ? 'active' : ''}
            onClick={() => setUnit('fahrenheit')}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
