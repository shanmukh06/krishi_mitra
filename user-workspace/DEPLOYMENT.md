# FarmAI Deployment Guide

## Prerequisites
- Python 3.8+
- Node.js 14+ (for frontend builds)
- Google Cloud account with:
  - Earth Engine enabled
  - Gemini API enabled
- Firebase account (optional)

## Backend Setup
1. Install dependencies:
```bash
pip install -r backend/requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. Start backend:
```bash
python backend/server.py
```

## Frontend Setup
1. Install Tailwind CSS (if needed):
```bash
npm install -D tailwindcss
npx tailwindcss init
```

2. Start development server:
```bash
python -m http.server 8001 -d frontend
```

## Production Deployment
### Option 1: Docker
```bash
docker build -t farmai .
docker run -p 8000:8000 -p 8001:8001 farmai
```

### Option 2: Cloud Run (GCP)
1. Build container:
```bash
gcloud builds submit --tag gcr.io/your-project/farmai
```

2. Deploy:
```bash
gcloud run deploy --image gcr.io/your-project/farmai
```

## Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| PORT | Yes | Backend port |
| FRONTEND_PORT | Yes | Frontend port |
| EE_SERVICE_ACCOUNT | Yes | Earth Engine service account |
| EE_PRIVATE_KEY | Yes | Earth Engine private key |
| GEMINI_API_KEY | Yes | Gemini API key |
| DEBUG_MODE | No | Set to False in production |