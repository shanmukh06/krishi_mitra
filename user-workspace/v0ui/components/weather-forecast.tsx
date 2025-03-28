"use client"

import { Cloud, CloudDrizzle, CloudRain, CloudSun, Sun, AlertTriangle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const weatherData = [
  {
    day: "सोम",
    date: "10 मार्च",
    icon: <Sun className="h-8 w-8 text-yellow-500" />,
    temp: 32,
    rain: 0,
    description: "साफ आसमान",
  },
  {
    day: "मंगल",
    date: "11 मार्च",
    icon: <CloudSun className="h-8 w-8 text-yellow-400" />,
    temp: 30,
    rain: 10,
    description: "आंशिक बादल",
  },
  {
    day: "बुध",
    date: "12 मार्च",
    icon: <Cloud className="h-8 w-8 text-gray-400" />,
    temp: 28,
    rain: 30,
    description: "बादल छाए",
  },
  {
    day: "गुरु",
    date: "13 मार्च",
    icon: <CloudDrizzle className="h-8 w-8 text-blue-400" />,
    temp: 27,
    rain: 60,
    description: "हल्की बारिश",
  },
  {
    day: "शुक्र",
    date: "14 मार्च",
    icon: <CloudRain className="h-8 w-8 text-blue-500" />,
    temp: 25,
    rain: 80,
    description: "बारिश",
  },
  {
    day: "शनि",
    date: "15 मार्च",
    icon: <CloudSun className="h-8 w-8 text-yellow-400" />,
    temp: 29,
    rain: 20,
    description: "आंशिक बादल",
  },
  {
    day: "रवि",
    date: "16 मार्च",
    icon: <Sun className="h-8 w-8 text-yellow-500" />,
    temp: 31,
    rain: 0,
    description: "साफ आसमान",
  },
]

const historicalData = [
  { year: "2020", rainfall: 1200, temperature: 28 },
  { year: "2021", rainfall: 1100, temperature: 28.5 },
  { year: "2022", rainfall: 950, temperature: 29 },
  { year: "2023", rainfall: 850, temperature: 29.5 },
  { year: "2024", rainfall: 750, temperature: 30 },
]

export function WeatherForecast() {
  return (
    <div className="grid gap-4">
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>जलवायु परिवर्तन अलर्ट</AlertTitle>
        <AlertDescription>
          Google Earth Engine के विश्लेषण के अनुसार, आपके क्षेत्र में पिछले 5 वर्षों में औसत तापमान में 2°C की वृद्धि और वार्षिक वर्षा में 30%
          की कमी आई है।
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>7 दिन का मौसम पूर्वानुमान</CardTitle>
          <CardDescription>Google Earth Engine से उपग्रह डेटा पर आधारित</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            <div className="grid grid-cols-7 gap-2">
              {weatherData.map((day, index) => (
                <div key={index} className="flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-medium">{day.day}</span>
                  <span className="text-xs text-muted-foreground">{day.date}</span>
                  <div className="my-2">{day.icon}</div>
                  <span className="text-sm font-medium">{day.temp}°C</span>
                  <span className="text-xs text-muted-foreground">{day.rain}%</span>
                </div>
              ))}
            </div>
            <div className="h-[200px] w-full">
              <ChartContainer
                config={{
                  temperature: {
                    label: "तापमान (°C)",
                    color: "hsl(var(--chart-1))",
                  },
                  rainfall: {
                    label: "वर्षा (%)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weatherData.map((item) => ({
                      name: item.day,
                      temperature: item.temp,
                      rainfall: item.rain / 10, // Scaling down for better visualization
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="temperature" stroke="var(--color-temperature)" strokeWidth={2} />
                    <Line type="monotone" dataKey="rainfall" stroke="var(--color-rainfall)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>जलवायु परिवर्तन विश्लेषण</CardTitle>
          <CardDescription>पिछले 5 वर्षों का डेटा</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ChartContainer
              config={{
                rainfall: {
                  label: "वार्षिक वर्षा (mm)",
                  color: "hsl(var(--chart-1))",
                },
                temperature: {
                  label: "औसत तापमान (°C)",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id="colorRainfall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-rainfall)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-rainfall)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="rainfall"
                    stroke="var(--color-rainfall)"
                    fillOpacity={1}
                    fill="url(#colorRainfall)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="temperature"
                    stroke="var(--color-temperature)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Google Earth Engine के डेटा से पता चलता है कि आपके क्षेत्र में वर्षा में लगातार कमी और तापमान में वृद्धि हो रही है। इससे फसल
              चक्र और जल उपलब्धता पर प्रभाव पड़ सकता है।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

