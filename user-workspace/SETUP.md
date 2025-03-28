# FarmAI Project Setup Guide

## Prerequisites
- Python 3.8+
- Node.js 18+
- Google Cloud account with:
  - Secret Manager API enabled
  - Earth Engine API enabled
  - Gemini API enabled
- Earth Engine authenticated account

## Backend Setup

1. Create and activate Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate
```

2. Install Python dependencies:
```bash
pip install -r backend/requirements.txt
```

3. Configure environment variables:
```bash
echo "GCP_PROJECT_ID=your-gcp-project-id" >> backend/.env
echo "GEMINI_API_KEY=your-gemini-api-key" >> backend/.env
```

4. Authenticate Earth Engine:
```bash
earthengine authenticate
```

5. Run backend server:
```bash
python backend/server.py
```

## Frontend Setup

1. Install Node.js dependencies:
```bash
cd new_frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

## Configuration Notes

### Backend Secrets
- Earth Engine credentials will be automatically fetched from Google Cloud Secret Manager
- Required secrets:
  - EE_SERVICE_ACCOUNT
  - EE_PRIVATE_KEY
  - GEMINI_API_KEY

### Frontend
- Runs on port 3000 by default
- Connects to backend on port 8000
- No environment variables required

## Testing
- Backend tests:
```bash
cd backend && pytest
```

- Frontend tests:
```bash
cd new_frontend && npm test
```

## Deployment
See DEPLOYMENT.md for production deployment instructions