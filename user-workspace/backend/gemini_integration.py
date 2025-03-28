import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class GeminiAdvisor:
    def __init__(self):
        """Initialize the advisor with Gemini API"""
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash-lite-001')

    def get_advisory(self, weather_data, soil_data):
        """
        Generate crop advisory based on environmental data using Gemini AI
        
        Args:
            weather_data: dict with temperature, precipitation, humidity
            soil_data: dict with moisture, ph, nutrients
            
        Returns:
            dict: Advisory containing recommendations
        """
        prompt = f"""
        You are an expert agricultural advisor. Based on the following environmental data, provide detailed farming recommendations in Hindi:

        Weather Data:
        - Temperature: {weather_data['temperature']}°C
        - Precipitation: {weather_data['precipitation']}mm
        - Humidity: {weather_data['humidity']}%
        
        Soil Data:
        - Moisture: {soil_data['moisture']}
        - pH: {soil_data['ph']}
        - Nutrients:
          - Nitrogen: {soil_data['nutrients']['nitrogen']}
          - Phosphorus: {soil_data['nutrients']['phosphorus']}
          - Potassium: {soil_data['nutrients']['potassium']}
        
        Please provide a detailed advisory in Hindi that includes:
        1. Suitable crops for these conditions (with specific varieties)
        2. Fertilizer recommendations based on soil nutrients
        3. Optimal planting schedule
        4. Water management advice
        5. Additional important notes for farmers
        
        Make the response specific to these exact conditions and provide varied recommendations based on the data.
        """
        
        try:
            response = self.model.generate_content(prompt)
            if not response.text:
                raise ValueError("Empty response from Gemini API")
                
            recommendations = self._parse_response(response.text)
            return recommendations
        except Exception as e:
            print(f"Error getting Gemini advisory: {str(e)}")
            # Fallback to mock data if API fails
            return self._get_mock_recommendations(weather_data, soil_data)

    def _parse_response(self, response_text):
        """Parse the Gemini response into structured recommendations"""
        recommendations = {
            'crops': [],
            'fertilizer': '',
            'schedule': '',
            'notes': []
        }
        
        # Split response into sections
        sections = response_text.split('\n\n')
        
        for section in sections:
            section = section.strip()
            if not section:
                continue
                
            # Try to identify the section type
            if 'फसल' in section or 'crop' in section.lower():
                recommendations['crops'].append(section)
            elif 'खाद' in section or 'fertilizer' in section.lower():
                recommendations['fertilizer'] = section
            elif 'समय' in section or 'schedule' in section.lower():
                recommendations['schedule'] = section
            else:
                recommendations['notes'].append(section)
        
        # If no sections were identified, try line-by-line parsing
        if not any(recommendations.values()):
            lines = response_text.split('\n')
            current_section = None
            
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                    
                if 'फसल' in line or 'crop' in line.lower():
                    current_section = 'crops'
                elif 'खाद' in line or 'fertilizer' in line.lower():
                    current_section = 'fertilizer'
                elif 'समय' in line or 'schedule' in line.lower():
                    current_section = 'schedule'
                elif 'नोट' in line or 'note' in line.lower():
                    current_section = 'notes'
                else:
                    if current_section == 'crops':
                        recommendations['crops'].append(line)
                    elif current_section == 'fertilizer':
                        recommendations['fertilizer'] = line
                    elif current_section == 'schedule':
                        recommendations['schedule'] = line
                    elif current_section == 'notes':
                        recommendations['notes'].append(line)
        
        return recommendations

    def _get_mock_recommendations(self, weather_data, soil_data):
        """Fallback mock recommendations if API fails"""
        return {
            'crops': self._recommend_crops(weather_data, soil_data),
            'fertilizer': self._recommend_fertilizer(soil_data),
            'schedule': self._recommend_schedule(weather_data),
            'notes': self._generate_notes(weather_data, soil_data)
        }

    def _recommend_crops(self, weather, soil):
        """Recommend crops based on conditions"""
        if soil['moisture'] > 0.4 and weather['precipitation'] > 0.1:
            return ['गेहूं', 'जौ', 'दलहन']
        elif soil['ph'] > 6.5:
            return ['मक्का', 'सोयाबीन']
        else:
            return ['बाजरा', 'ज्वार']

    def _recommend_fertilizer(self, soil):
        """Recommend fertilizer based on soil nutrients"""
        if soil['nutrients']['nitrogen'] < 0.5:
            return 'उच्च नाइट्रोजन (20-10-10)'
        elif soil['nutrients']['phosphorus'] < 0.3:
            return 'उच्च फॉस्फोरस (10-20-10)'
        else:
            return 'संतुलित (10-10-10)'

    def _recommend_schedule(self, weather):
        """Recommend planting schedule"""
        if weather['temperature'] > 20 and weather['precipitation'] > 0.2:
            return 'तुरंत बुवाई करें'
        else:
            return '1-2 सप्ताह प्रतीक्षा करें'

    def _generate_notes(self, weather, soil):
        """Generate advisory notes"""
        notes = []
        if soil['moisture'] < 0.3:
            notes.append('सिंचाई पर विचार करें')
        if weather['precipitation'] < 0.1:
            notes.append('कम वर्षा की संभावना')
        return notes