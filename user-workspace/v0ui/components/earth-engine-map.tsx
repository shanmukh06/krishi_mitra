"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layers, Droplets, Thermometer, Sprout } from "lucide-react"

export function EarthEngineMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeLayer, setActiveLayer] = useState("ndvi")

  useEffect(() => {
    // Simulate loading Earth Engine data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // This would normally initialize Google Earth Engine and load the map
  useEffect(() => {
    if (!isLoading && mapRef.current) {
      // In a real implementation, this would initialize the Google Earth Engine map
      // using the Google Earth Engine JavaScript API
      console.log("Initializing Earth Engine map with layer:", activeLayer)
    }
  }, [isLoading, activeLayer])

  const layerDescriptions = {
    ndvi: "नॉर्मलाइज्ड डिफरेंस वेजिटेशन इंडेक्स (NDVI) फसल के स्वास्थ्य और विकास को दर्शाता है। हरा रंग स्वस्थ वनस्पति को दर्शाता है।",
    moisture: "मिट्टी की नमी का स्तर दिखाता है। नीला रंग अधिक नमी वाले क्षेत्रों को दर्शाता है।",
    temperature: "सतह का तापमान दिखाता है। लाल रंग गर्म क्षेत्रों को दर्शाता है।",
    rainfall: "पिछले 30 दिनों में हुई वर्षा की मात्रा दिखाता है।",
  }

  return (
    <div className="grid gap-4">
      <Tabs value={activeLayer} onValueChange={setActiveLayer} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ndvi" className="flex items-center gap-1">
            <Sprout className="h-4 w-4" />
            <span className="hidden sm:inline">फसल स्वास्थ्य</span>
          </TabsTrigger>
          <TabsTrigger value="moisture" className="flex items-center gap-1">
            <Droplets className="h-4 w-4" />
            <span className="hidden sm:inline">मिट्टी की नमी</span>
          </TabsTrigger>
          <TabsTrigger value="temperature" className="flex items-center gap-1">
            <Thermometer className="h-4 w-4" />
            <span className="hidden sm:inline">तापमान</span>
          </TabsTrigger>
          <TabsTrigger value="rainfall" className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">वर्षा</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <div ref={mapRef} className="h-[300px] w-full bg-gray-100 flex items-center justify-center">
              {isLoading ? (
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2">Google Earth Engine डेटा लोड हो रहा है...</p>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  {activeLayer === "ndvi" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-green-400 to-green-700 opacity-70"></div>
                  )}
                  {activeLayer === "moisture" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-blue-300 to-blue-600 opacity-70"></div>
                  )}
                  {activeLayer === "temperature" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-yellow-300 to-red-500 opacity-70"></div>
                  )}
                  {activeLayer === "rainfall" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-600 opacity-70"></div>
                  )}

                  {/* Map overlay with location markers */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border-2 border-red-500 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      </div>
                      <div className="absolute bottom-10 right-10 bg-white/90 p-2 rounded-md text-xs">
                        सिद्धार्थनगर, उत्तर प्रदेश
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white">
              <p className="text-sm text-muted-foreground">
                {layerDescriptions[activeLayer as keyof typeof layerDescriptions]}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span className="text-xs">आपका खेत</span>
                </div>
                <Button size="sm">पूर्ण स्क्रीन देखें</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

