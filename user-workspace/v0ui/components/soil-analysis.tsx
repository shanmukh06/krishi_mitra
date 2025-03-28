"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const soilData = {
  nutrients: [
    { name: "नाइट्रोजन", value: 35, optimal: 60, color: "#ef4444" },
    { name: "फॉस्फोरस", value: 25, optimal: 40, color: "#f97316" },
    { name: "पोटैशियम", value: 70, optimal: 60, color: "#22c55e" },
    { name: "जिंक", value: 45, optimal: 50, color: "#f59e0b" },
    { name: "आयरन", value: 55, optimal: 50, color: "#22c55e" },
    { name: "सल्फर", value: 30, optimal: 40, color: "#f97316" },
  ],
  properties: [
    { name: "पीएच", value: 6.8, optimal: "6.5-7.5", status: "अनुकूल" },
    { name: "जैविक पदार्थ", value: "1.2%", optimal: ">2%", status: "कम" },
    { name: "मिट्टी का प्रकार", value: "दोमट", optimal: "-", status: "-" },
    { name: "जल धारण क्षमता", value: "मध्यम", optimal: "उच्च", status: "सुधार की आवश्यकता" },
  ],
}

export function SoilAnalysis() {
  const [selectedField, setSelectedField] = useState("field1")

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">मिट्टी विश्लेषण</h2>
        <Select defaultValue={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="खेत चुनें" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="field1">खेत #1 (2.5 एकड़)</SelectItem>
            <SelectItem value="field2">खेत #2 (1.8 एकड़)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>मिट्टी स्वास्थ्य स्कोर</CardTitle>
          <CardDescription>Google Earth Engine और स्थानीय मिट्टी परीक्षण डेटा पर आधारित</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full border-8 border-amber-500"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-600">65</div>
                  <div className="text-sm text-muted-foreground">मध्यम</div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              आपकी मिट्टी का स्वास्थ्य मध्यम है। नाइट्रोजन और फॉस्फोरस की कमी है, और जैविक पदार्थ बढ़ाने की आवश्यकता है।
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="nutrients">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nutrients">पोषक तत्व</TabsTrigger>
          <TabsTrigger value="properties">मिट्टी के गुण</TabsTrigger>
          <TabsTrigger value="recommendations">सिफारिशें</TabsTrigger>
        </TabsList>

        <TabsContent value="nutrients" className="border-none p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>पोषक तत्व विश्लेषण</CardTitle>
              <CardDescription>मिट्टी में मौजूद पोषक तत्वों का स्तर</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={soilData.nutrients} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "पोषक तत्व स्तर (ppm)", angle: -90, position: "insideLeft" }} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="font-medium">{data.name}:</div>
                                  <div className="text-right">{data.value} ppm</div>
                                  <div className="font-medium">अनुकूल:</div>
                                  <div className="text-right">{data.optimal} ppm</div>
                                  <div className="font-medium">स्थिति:</div>
                                  <div className="text-right">{data.value >= data.optimal ? "पर्याप्त" : "कम"}</div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="value" fill="#8884d8">
                        {soilData.nutrients.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>बहुत कम</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span>कम</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>पर्याप्त</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="border-none p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>मिट्टी के भौतिक और रासायनिक गुण</CardTitle>
              <CardDescription>मिट्टी की संरचना और गुणवत्ता</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">गुण</th>
                      <th className="p-2 text-left font-medium">वर्तमान मान</th>
                      <th className="p-2 text-left font-medium">अनुकूल सीमा</th>
                      <th className="p-2 text-left font-medium">स्थिति</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soilData.properties.map((property, index) => (
                      <tr key={index} className={index !== soilData.properties.length - 1 ? "border-b" : ""}>
                        <td className="p-2">{property.name}</td>
                        <td className="p-2">{property.value}</td>
                        <td className="p-2">{property.optimal}</td>
                        <td className="p-2">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs ${
                              property.status === "अनुकूल"
                                ? "bg-green-100 text-green-800"
                                : property.status === "कम"
                                  ? "bg-amber-100 text-amber-800"
                                  : property.status === "सुधार की आवश्यकता"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {property.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium">मिट्टी का प्रकार: दोमट</h3>
                <div className="mt-2 flex h-6 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-[30%] bg-amber-400" title="रेत (30%)"></div>
                  <div className="h-full w-[45%] bg-amber-700" title="गाद (45%)"></div>
                  <div className="h-full w-[25%] bg-amber-900" title="मिट्टी (25%)"></div>
                </div>
                <div className="mt-1 flex justify-between text-xs">
                  <span>रेत: 30%</span>
                  <span>गाद: 45%</span>
                  <span>मिट्टी: 25%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="border-none p-0 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>मिट्टी सुधार सिफारिशें</CardTitle>
              <CardDescription>Google Earth Engine और Gemini AI द्वारा अनुशंसित</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">पोषक तत्व प्रबंधन</h3>
                  <ul className="mt-2 grid gap-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>नाइट्रोजन: प्रति एकड़ 60 किग्रा यूरिया का प्रयोग करें (दो खुराक में विभाजित)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>फॉस्फोरस: प्रति एकड़ 50 किग्रा सिंगल सुपर फॉस्फेट का प्रयोग करें</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>जिंक: प्रति एकड़ 10 किग्रा जिंक सल्फेट का प्रयोग करें</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">जैविक पदार्थ बढ़ाने के लिए</h3>
                  <ul className="mt-2 grid gap-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>प्रति एकड़ 2 टन गोबर की खाद या कम्पोस्ट का प्रयोग करें</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>हरी खाद के लिए ढैंचा या सनई की खेती करें</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>फसल अवशेषों को खेत में ही मिला दें, न जलाएं</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">जल प्रबंधन</h3>
                  <ul className="mt-2 grid gap-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>मिट्टी की जल धारण क्षमता बढ़ाने के लिए जैविक पदार्थ बढ़ाएं</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>ड्रिप सिंचाई या स्प्रिंकलर सिंचाई अपनाएं</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>मल्चिंग का उपयोग करें</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full">विस्तृत मिट्टी सुधार योजना डाउनलोड करें</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

