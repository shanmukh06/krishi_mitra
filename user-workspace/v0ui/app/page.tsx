import Link from "next/link"
import { Cloud, CloudRain, Droplets, Sun, Thermometer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeatherForecast } from "@/components/weather-forecast"
import { CropRecommendations } from "@/components/crop-recommendations"
import { SoilAnalysis } from "@/components/soil-analysis"
import { LanguageSwitcher } from "@/components/language-switcher"
import { GeminiAdvisor } from "@/components/gemini-advisor"
import { EarthEngineMap } from "@/components/earth-engine-map"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">KrishiMitra</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="flex-1 py-6 md:py-8 lg:py-10">
        <div className="container grid gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">नमस्ते, किसान मित्र!</h1>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Sun className="mr-2 h-4 w-4" />
                आज का मौसम
              </Button>
            </div>
            <p className="text-muted-foreground">
              Google Earth Engine और Gemini AI द्वारा संचालित आपकी व्यक्तिगत कृषि सलाहकार
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-900">वर्तमान तापमान</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-blue-700" />
                  <span className="text-2xl font-bold text-blue-900">32°C</span>
                </div>
                <p className="mt-2 text-xs text-blue-700">पिछले वर्ष की तुलना में +2°C</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-900">आद्रता</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-green-700" />
                  <span className="text-2xl font-bold text-green-900">65%</span>
                </div>
                <p className="mt-2 text-xs text-green-700">सामान्य से 5% अधिक</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-yellow-900">वर्षा संचय</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5 text-yellow-700" />
                  <span className="text-2xl font-bold text-yellow-900">450mm</span>
                </div>
                <p className="mt-2 text-xs text-yellow-700">सामान्य से 15% कम</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-900">अगले 7 दिन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-purple-700" />
                  <span className="text-2xl font-bold text-purple-900">वर्षा</span>
                </div>
                <p className="mt-2 text-xs text-purple-700">40-60mm की संभावना</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>आपका स्थान: सिद्धार्थनगर, उत्तर प्रदेश</CardTitle>
              <CardDescription>Google Earth Engine से उपग्रह डेटा</CardDescription>
            </CardHeader>
            <CardContent>
              <EarthEngineMap />
            </CardContent>
          </Card>

          <Tabs defaultValue="ai-advisor" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ai-advisor">AI सलाहकार</TabsTrigger>
              <TabsTrigger value="weather">मौसम विश्लेषण</TabsTrigger>
              <TabsTrigger value="soil">मिट्टी विश्लेषण</TabsTrigger>
              <TabsTrigger value="crops">फसल सलाह</TabsTrigger>
            </TabsList>
            <TabsContent value="ai-advisor" className="border-none p-0 pt-4">
              <GeminiAdvisor />
            </TabsContent>
            <TabsContent value="weather" className="border-none p-0 pt-4">
              <WeatherForecast />
            </TabsContent>
            <TabsContent value="soil" className="border-none p-0 pt-4">
              <SoilAnalysis />
            </TabsContent>
            <TabsContent value="crops" className="border-none p-0 pt-4">
              <CropRecommendations />
            </TabsContent>
          </Tabs>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>जलवायु परिवर्तन अनुकूलन</CardTitle>
                <CardDescription>आपके क्षेत्र के लिए विशेष सलाह</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 mb-4">
                  <h3 className="font-medium text-amber-800">अनियमित वर्षा पैटर्न</h3>
                  <p className="mt-2 text-sm text-amber-700">
                    Google Earth Engine डेटा के अनुसार, आपके क्षेत्र में पिछले 5 वर्षों में वर्षा पैटर्न में महत्वपूर्ण बदलाव आए हैं। जल संरक्षण
                    तकनीकों को अपनाने की सलाह दी जाती है।
                  </p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="font-medium text-green-800">अनुशंसित अनुकूलन रणनीतियाँ</h3>
                  <ul className="mt-2 grid gap-2 text-sm text-green-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>सूखा प्रतिरोधी फसल किस्मों का उपयोग करें</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>वर्षा जल संचयन संरचनाएं स्थापित करें</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>मिश्रित फसल प्रणाली अपनाएं</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>ड्रिप सिंचाई का उपयोग करें</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>संसाधन अनुकूलन</CardTitle>
                <CardDescription>आपके खेत के लिए व्यक्तिगत सिफारिशें</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">उर्वरक उपयोग</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-gray-200">
                        <div className="h-2 w-3/4 rounded-full bg-red-500"></div>
                      </div>
                      <span className="text-sm">75% अधिक</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      मिट्टी परीक्षण के आधार पर 30% कम उर्वरक का उपयोग करें
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">पानी का उपयोग</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-gray-200">
                        <div className="h-2 w-1/2 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-sm">50% अधिक</span>
                    </div>
                    <span className="text-xs text-muted-foreground">मिट्टी की नमी सेंसर और ड्रिप सिंचाई अपनाएं</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">कीटनाशक उपयोग</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-gray-200">
                        <div className="h-2 w-4/5 rounded-full bg-red-500"></div>
                      </div>
                      <span className="text-sm">80% अधिक</span>
                    </div>
                    <span className="text-xs text-muted-foreground">एकीकृत कीट प्रबंधन तकनीकों का उपयोग करें</span>
                  </div>
                  <Button className="w-full">विस्तृत संसाधन योजना प्राप्त करें</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; 2025 KrishiMitra. Google Earth Engine और Gemini AI द्वारा संचालित.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              सहायता
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              गोपनीयता नीति
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

