from flask import Flask, jsonify, request
from flask_cors import CORS
from earth_engine import EarthEngineClient
from gemini_integration import GeminiAdvisor
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize services
ee_client = EarthEngineClient()
gemini_advisor = GeminiAdvisor()

@app.route('/advisory', methods=['GET', 'OPTIONS'])
def get_advisory():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'}), 200
        
    try:
        lat = float(request.args.get('lat'))
        lng = float(request.args.get('lng'))
        
        if not (-90 <= lat <= 90) or not (-180 <= lng <= 180):
            raise ValueError("Invalid coordinates")
            
        # Get data and generate advisory
        date = datetime.now().strftime('%Y-%m-%d')
        weather = ee_client.get_weather_data((lng, lat), date)
        soil = ee_client.get_soil_data((lng, lat))
        advisory = gemini_advisor.get_advisory(weather, soil)
        
        return jsonify({
            'status': 'success',
            'advisory': advisory,
            'weather': weather,
            'soil': soil
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

# [Include other existing routes...]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)