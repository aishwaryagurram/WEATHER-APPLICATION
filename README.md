# Weather Application

A responsive web application that fetches real-time weather data from the OpenWeatherMap API and displays it in a user-friendly interface.

## Demo

Check out the live demo of the application [here](#) (coming soon).

## Features

- Search for weather information by city name, zip code, or coordinates
- Display current weather conditions including temperature, weather description, humidity, wind speed, etc.
- 5-day weather forecast
- Toggle between Celsius and Fahrenheit units
- Get weather for current location using browser geolocation
- Responsive design for mobile, tablet, and desktop devices

## Tech Stack

- **Frontend**: React, Vite, Axios, React Icons
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **API**: OpenWeatherMap API

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- OpenWeatherMap API key (get it from [OpenWeatherMap](https://openweathermap.org/api))

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/weather-app
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   ```
   Replace `your_openweathermap_api_key` with your actual API key.

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## API Endpoints

- `GET /api/weather/city/:cityName` - Get weather by city name
- `GET /api/weather/coordinates?lat=<latitude>&lon=<longitude>` - Get weather by coordinates
- `GET /api/weather/zip/:zipCode?countryCode=<countryCode>` - Get weather by zip code
- `GET /api/weather/forecast/city/:cityName` - Get 5-day forecast by city name

## Deployment

- Frontend: Deploy to GitHub Pages or Netlify
- Backend: Deploy to Heroku, Render, or any other Node.js hosting service
- Database: Use MongoDB Atlas for production