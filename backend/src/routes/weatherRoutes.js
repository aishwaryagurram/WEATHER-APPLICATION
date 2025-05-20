const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get weather by city name
router.get('/city/:cityName', async (req, res) => {
  try {
    const { cityName } = req.params;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: 'API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'City not found' });
    }
    
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Get weather by coordinates
router.get('/coordinates', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: 'API key not configured' });
    }

    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Get weather by zip code
router.get('/zip/:zipCode', async (req, res) => {
  try {
    const { zipCode } = req.params;
    const { countryCode = 'us' } = req.query;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: 'API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Location not found' });
    }
    
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Get forecast data
router.get('/forecast/city/:cityName', async (req, res) => {
  try {
    const { cityName } = req.params;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: 'API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching forecast data:', error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'City not found' });
    }
    
    res.status(500).json({ message: 'Error fetching forecast data' });
  }
});

module.exports = router;
