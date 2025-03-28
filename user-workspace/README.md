# Krishi Mitra - Farmer Advisory System

An AI-powered agricultural advisory system for small farmers in India, built using Google APIs.

## Features

- Real-time weather monitoring and alerts
- Soil health analysis
- Crop recommendation engine
- Pest/disease identification
- Multilingual advisory (English/Hindi)

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Python (Flask)
- **Google APIs**: 
  - Earth Engine (geospatial analysis)
  - Gemini (AI recommendations)
  - Firebase (optional for auth/storage)

## Setup Instructions

1. **Prerequisites**:
   - Python 3.8+
   - Google Cloud account with enabled APIs
   - Earth Engine account approval

2. **Installation**:
   ```bash
   # Clone repository (when available)
   git clone https://github.com/your-repo/krishi-mitra.git
   cd krishi-mitra

   # Install backend dependencies
   pip install -r backend/requirements.txt

   # Set up environment variables
   cp .env.example .env
   # Edit .env with your API credentials
   ```

3. **Configuration**:
   - Obtain Google API credentials:
     - Create service account for Earth Engine
     - Enable Gemini API and get API key
   - Add credentials to `.env` file

4. **Running the Application**:
   ```bash
   # Start backend server
   python backend/server.py

   # Open frontend in browser
   # Use Python HTTP server for development:
   python -m http.server 8000 -d frontend
   ```

5. **Testing**:
   - Access the application at `http://localhost:8000`
   - Test endpoints:
     - `/health` - Basic health check
     - `/weather` - Sample weather data
     - `/soil` - Sample soil analysis
     - `/advisory` - Sample recommendations

## API Documentation

### Earth Engine Endpoints
- `POST /api/ndvi` - Get NDVI analysis
- `POST /api/soil` - Get soil moisture data
- `POST /api/weather` - Get historical weather

### Gemini Endpoints
- `POST /api/recommend` - Get crop recommendations
- `POST /api/irrigate` - Get irrigation advice
- `POST /api/diagnose` - Pest/disease identification

## Deployment

For production deployment:
1. Set up Gunicorn/WSGI server
2. Configure Nginx reverse proxy
3. Set `DEBUG_MODE=False` in `.env`
4. Implement proper secret management

## License
MIT License