"""
Secure credential management for FarmAI
"""
from google.cloud import secretmanager
import os
from dotenv import load_dotenv

load_dotenv()

class SecretManager:
    def __init__(self, project_id):
        self.client = secretmanager.SecretManagerServiceClient()
        self.project_id = project_id

    def get_secret(self, secret_id):
        name = f"projects/{self.project_id}/secrets/{secret_id}/versions/latest"
        response = self.client.access_secret_version(name)
        return response.payload.data.decode('UTF-8')

# Example usage:
if __name__ == "__main__":
    # Initialize with your Google Cloud project ID
    sm = SecretManager(os.getenv('GCP_PROJECT_ID'))
    
    # Retrieve secrets
    try:
        EE_SERVICE_ACCOUNT = sm.get_secret('EE_SERVICE_ACCOUNT')
        EE_PRIVATE_KEY = sm.get_secret('EE_PRIVATE_KEY') 
        GEMINI_API_KEY = sm.get_secret('GEMINI_API_KEY')
        
        print("Secrets retrieved successfully")
    except Exception as e:
        print(f"Error retrieving secrets: {e}")