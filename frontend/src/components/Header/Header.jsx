import { WiDaySunny } from 'react-icons/wi';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <WiDaySunny />
          <span>Weather App</span>
        </div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
            OpenWeatherMap
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
