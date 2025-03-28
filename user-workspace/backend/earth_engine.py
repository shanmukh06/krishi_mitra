import ee

class EarthEngineClient:
    def __init__(self):
        """Initialize Earth Engine with direct credentials"""
        try:
            # Directly stored service account credentials
            service_account = "earth-engine-sa@gemini-hackathon-farmer.iam.gserviceaccount.com"
            private_key = """
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9BYlTTJOWWTKG
wJ/+zLUGxaVkBIUFOYAKY51nOWx7net1bTgDY3G21E5PwaL8qR4NABFoha+DAkSa
scUqG4UQAKsb0+qZE9y4kK+S1zaI/kP+kgrflY+KJrBmrm7QVb0uQtulkSBThX/3
x2JxeRs+0PKNtYVrUBxhik6wC6t6GZmgTF5F2OffHkj1DkW30St3W+NEWmNdnm6d
ScHBtVCR3pKRH2OYVdlCck0RnMMFveDB9IkyoBtOMWqCDX15/spotylYQzUnUq4D
KCOgxO/IOPIamRoC90KPmS5thiPDR3yPCY7DTzu2v7/k+VT3jdI3LiGNKZbTXINg
DSJK+d9PAgMBAAECggEAL8CQz0r2tBJnqdRK9zdm+kV/QXPE2SuMFdPRpYzDw70D
CYDkmDKMvUgIWqzMDLF6xoUAYNv5GYs+oqgLa9ZU+NR6ZcbVKwPyDGx89odJHzXB
HrRta8ugXiHlCaPCmf43E1NPoxW1SXRd/k5QJ+OVBvsJc9RqVtB/wwKKW34vPWJ/
zIElR9ANeNKGF74kNjuJ5pZd4JZ50KxWBFwG4LFl9itNYFKyD2QRWxRBTYGTl6i5
E67u9tRcYeCffNZdvi0sToIYwKbQz8XikztmpfWYd4kzreoVEh6u8/9fRxgtoyza
wTB3AUFudUCGj7hEygdi5GbHevU5HzuksUmjhj3VtQKBgQDtgZ+IiBpa93BC/aOF
+RshafByM4J/d9yVBv6Og/1qD+QgwDDm12vzdtfuOcxCp/1s85XZbvcCfBtuUH1P
dIKEHtn9C/uS2REh9TYp71SxK87IGitdLeAHktMjawTFHGJvbpoAhT1USSy4E0Vz
JiXP52vt8d0UrD10G0j+UEfU9QKBgQDLvW8m20ecWI/JzIVuA4Gc01D6iIHx71N0
YE6JTOHsnzqM2ZDtZPc26l7/WCsH91NDKdoSnDAv3QZ6hzXq/AAs17k0M/rbZAoM
P/NKn9ykvKCqPk/lUyR3Bjs//9DLpbRK0/TQSyjgpxoKqwrDm6Q4VvwKL/zuUcEW
2J5OtAUYswKBgQDncm79xOwyA3khvzwwXW3D5RIMqAeeojaR/6vnQ9abGftMsx20
hu9K5WBNZYOY3U4Ic2Nu7UTG5hxxJvzGhhp+F/aEMr4o/2FDv0rWGMVmlfM/askh
V4g+uSUKGcsfLqb6QkTPBwiZ72klxJnkOaOVc8borM6ty59jWweJ1L/7VQKBgBL6
pZUQDj6xPUvGIpPZ/cP3J27/MmOwMK0Bn69Imy8oshKW3dpPcnwKHylYNEH8tyPl
jSv4osCCrWzSlaI7MWT7/4OuZ+ryCcGUX3yPIcWy0KCrR1QMh7QSv4g5s2CVIhNq
ZT7WEYvD5TgjMNCB+i1JZRcp2zz0HrGbIjwgpuzjAoGAahNVLPVVKGzAQpx5NWLh
KnnR7oMtXGTtsqHstJrnUBE/Tq+M5dEYoq98tzXMcvrcfA8/U1kPNhY17DsVupX8
XGXJ0NoAQ34K8Btsjfx2FnksjQR22c2uwdf3YVC+I4sJvopNI1H3SXDxJ3Rtp16x
07zYlX8Ar/FTAmH0Ns0qTcY=
-----END PRIVATE KEY-----
"""
            
            print("Initializing Earth Engine with service account...")
            credentials = ee.ServiceAccountCredentials(service_account, key_data=private_key)
            ee.Initialize(credentials)
            
            # Verify initialization
            if not ee.data._credentials:
                raise Exception("Earth Engine initialization failed - no credentials")
                
            print("Earth Engine initialized successfully")
        except Exception as e:
            print(f"Earth Engine initialization failed: {str(e)}")
            # Continue with mock data mode

    def get_weather_data(self, coordinates, date):
        """Get weather data for coordinates and date from Earth Engine"""
        try:
            # First verify Earth Engine connection
            if not ee.data._credentials:
                raise Exception("Earth Engine not initialized")
                
            lat, lng = coordinates
            point = ee.Geometry.Point(lng, lat)
            
            print("Checking Earth Engine access...")
            print(f"Available datasets: {ee.data.getAssetRoots()}")
            
            print("Accessing MODIS/006/MOD44B Vegetation Continuous Fields...")
            modis = ee.ImageCollection('MODIS/006/MOD44B') \
                .filterDate(date, ee.Date(date).advance(1, 'day')) \
                .select('Percent_Tree_Cover') \
                .first()
            
            if not modis:
                raise Exception("No MODIS data available")
                
            print("Calculating temperature...")
            lst_stats = modis.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=point,
                scale=1000
            )
            print(f"Region reduction result: {lst_stats.getInfo()}")
            
            lst = lst_stats.get('LST_Day_1km')
            print(f"Raw LST value: {lst.getInfo() if lst else 'None'}")
            
            if lst:
                temp_k = ee.Number(lst)
                temp_c = temp_k.subtract(273.15)
                print(f"Converted temperature: {temp_c.getInfo()}°C")
            else:
                temp_c = None
            
            print(f"Retrieved temperature: {temp_c.getInfo() if temp_c else 'None'}")
            
            return {
                'temperature': temp_c.getInfo() if temp_c else 25.3,
                'precipitation': 0.2,  # Placeholder
                'humidity': 0.65       # Placeholder
            }
        except Exception as e:
            print(f"Earth Engine data error: {str(e)}")
            # Fallback to mock data
            return {
                'temperature': 25.3,
                'precipitation': 0.2,
                'humidity': 0.65
            }

    def get_soil_data(self, coordinates):
        """Get soil properties for coordinates"""
        # Sample implementation
        return {
            'moisture': 0.42,
            'ph': 6.8,
            'nutrients': {
                'nitrogen': 0.5,
                'phosphorus': 0.3,
                'potassium': 0.4
            }
        }