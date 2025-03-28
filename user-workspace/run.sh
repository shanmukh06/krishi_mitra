#!/bin/bash

# Load environment variables
source .env

# Start backend server
echo "Starting backend server on port $PORT..."
cd backend
python server.py &
BACKEND_PID=$!
cd ..

# Start frontend server
echo "Starting frontend server on port $FRONTEND_PORT..."
cd frontend
python -m http.server $FRONTEND_PORT --bind 0.0.0.0 &
FRONTEND_PID=$!
cd ..

# Setup cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

echo -e "\nApplication is running!"
echo "-----------------------"
echo "Backend API: http://localhost:$PORT"
echo "Frontend UI: http://localhost:$FRONTEND_PORT"
echo -e "\nPress Ctrl+C to stop servers"

# Wait for servers to exit
wait
