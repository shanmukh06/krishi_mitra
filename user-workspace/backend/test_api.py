import unittest
import requests
import os
from dotenv import load_dotenv

load_dotenv()

class TestAPI(unittest.TestCase):
    BASE_URL = 'http://localhost:8000'
    
    @classmethod
    def setUpClass(cls):
        # Start the server in test mode
        os.system('python backend/server.py &')
        
    @classmethod
    def tearDownClass(cls):
        # Stop the server
        os.system('pkill -f "python backend/server.py"')
    
    def test_health_check(self):
        response = requests.get(f'{self.BASE_URL}/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'healthy')
        
    def test_weather_endpoint(self):
        response = requests.get(f'{self.BASE_URL}/weather')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('current_temp', data)
        self.assertIn('rainfall', data)
        self.assertIn('status', data)
        
    def test_soil_endpoint(self):
        response = requests.get(f'{self.BASE_URL}/soil')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('moisture', data)
        self.assertIn('ph', data)
        self.assertIn('status', data)
        
    def test_advisory_endpoint(self):
        response = requests.get(f'{self.BASE_URL}/advisory')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('recommended_crop', data)
        self.assertIn('irrigation_advice', data)
        self.assertIn('status', data)

if __name__ == '__main__':
    unittest.main()