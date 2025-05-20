import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-text">
          &copy; {currentYear} Weather App. All rights reserved.
        </div>
        <div className="footer-links">
          <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">
            API
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
