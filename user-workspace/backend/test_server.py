import unittest
from backend.server import app
import json

class TestAPIEndpoints(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_health_check(self):
        response = self.app.get('/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data)['status'], 'healthy')

    def test_weather_endpoint(self):
        # Test with valid coordinates
        response = self.app.get('/weather?lat=12.34&lng=56.78')
        self.assertEqual(response.status_code, 200)
        
        # Test with invalid coordinates
        response = self.app.get('/weather?lat=100&lng=200')
        self.assertEqual(response.status_code, 400)

    def test_soil_endpoint(self):
        # Test with valid coordinates
        response = self.app.get('/soil?lat=12.34&lng=56.78')
        self.assertEqual(response.status_code, 200)
        
        # Test missing parameters
        response = self.app.get('/soil')
        self.assertEqual(response.status_code, 400)

    def test_advisory_endpoint(self):
        # Test with valid coordinates
        response = self.app.get('/advisory?lat=12.34&lng=56.78')
        self.assertEqual(response.status_code, 200)
        
        # Test with invalid parameters
        response = self.app.get('/advisory?lat=abc&lng=def')
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()