import { useState } from 'react';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onSearch, isLoading }) => {
  const [searchType, setSearchType] = useState('city');
  const [cityName, setCityName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState('us');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (searchType === 'city' && cityName.trim()) {
      onSearch({ type: 'city', query: cityName.trim() });
    } else if (searchType === 'zip' && zipCode.trim()) {
      onSearch({ type: 'zip', query: zipCode.trim(), countryCode });
    } else if (searchType === 'coordinates' && latitude && longitude) {
      onSearch({ 
        type: 'coordinates', 
        query: { lat: parseFloat(latitude), lon: parseFloat(longitude) }
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchType('coordinates');
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
          
          // Automatically search with current location
          onSearch({ 
            type: 'coordinates', 
            query: { 
              lat: position.coords.latitude, 
              lon: position.coords.longitude 
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please check your browser settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-options">
          <div className="search-option">
            <input
              type="radio"
              id="city"
              name="searchType"
              value="city"
              checked={searchType === 'city'}
              onChange={() => setSearchType('city')}
            />
            <label htmlFor="city">City Name</label>
          </div>
          
          <div className="search-option">
            <input
              type="radio"
              id="zip"
              name="searchType"
              value="zip"
              checked={searchType === 'zip'}
              onChange={() => setSearchType('zip')}
            />
            <label htmlFor="zip">Zip Code</label>
          </div>
          
          <div className="search-option">
            <input
              type="radio"
              id="coordinates"
              name="searchType"
              value="coordinates"
              checked={searchType === 'coordinates'}
              onChange={() => setSearchType('coordinates')}
            />
            <label htmlFor="coordinates">Coordinates</label>
          </div>
          
          <button 
            type="button" 
            className="location-button"
            onClick={getCurrentLocation}
          >
            <FaLocationArrow /> Current Location
          </button>
        </div>

        {searchType === 'city' && (
          <div className="search-input-group">
            <input
              type="text"
              className="search-input"
              placeholder="Enter city name (e.g., London, New York)"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="btn search-button"
              disabled={isLoading || !cityName.trim()}
            >
              <FaSearch /> Search
            </button>
          </div>
        )}

        {searchType === 'zip' && (
          <div className="search-input-group">
            <input
              type="text"
              className="search-input"
              placeholder="Enter zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
            <input
              type="text"
              className="search-input"
              placeholder="Country code (default: us)"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            />
            <button 
              type="submit" 
              className="btn search-button"
              disabled={isLoading || !zipCode.trim()}
            >
              <FaSearch /> Search
            </button>
          </div>
        )}

        {searchType === 'coordinates' && (
          <>
            <div className="coordinates-inputs">
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />
              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn search-button"
              disabled={isLoading || !latitude || !longitude}
            >
              <FaSearch /> Search
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
