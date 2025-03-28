"use client"

import { TreesIcon as Plant } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export function CropRecommendations() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">फसल अनुशंसाएँ</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="मौसम चुनें" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">वर्तमान मौसम</SelectItem>
              <SelectItem value="kharif">खरीफ</SelectItem>
              <SelectItem value="rabi">रबी</SelectItem>
              <SelectItem value="zaid">जायद</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI द्वारा अनुशंसित फसलें</CardTitle>
          <CardDescription>Google Earth Engine और Gemini AI द्वारा आपके क्षेत्र के लिए विशेष रूप से अनुशंसित</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>धान (PB-1121)</CardTitle>
                  <Plant className="h-5 w-5 text-green-600" />
                </div>
                <CardDescription>बासमती किस्म</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid gap-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>जलवायु अनुकूलता</span>
                      <span className="font-medium text-green-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>मिट्टी अनुकूलता</span>
                      <span className="font-medium text-green-600">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>बाजार मूल्य</span>
                      <span className="font-medium text-green-600">₹3,800/क्विंटल</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>जल आवश्यकता</span>
                      <span className="font-medium text-amber-600">मध्यम-उच्च</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  विस्तृत जानकारी
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>मक्का (DMH-7)</CardTitle>
                  <Plant className="h-5 w-5 text-green-600" />
                </div>
                <CardDescription>संकर किस्म</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid gap-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>जलवायु अनुकूलता</span>
                      <span className="font-medium text-green-600">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>मिट्टी अनुकूलता</span>
                      <span className="font-medium text-green-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>बाजार मूल्य</span>
                      <span className="font-medium text-amber-600">₹2,100/क्विंटल</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>जल आवश्यकता</span>
                      <span className="font-medium text-green-600">कम-मध्यम</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  विस्तृत जानकारी
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>अरहर (उपास-120)</CardTitle>
                  <Plant className="h-5 w-5 text-green-600" />
                </div>
                <CardDescription>अल्पावधि किस्म</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid gap-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>जलवायु अनुकूलता</span>
                      <span className="font-medium text-green-600">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>मिट्टी अनुकूलता</span>
                      <span className="font-medium text-green-600">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>बाजार मूल्य</span>
                      <span className="font-medium text-green-600">₹7,500/क्विंटल</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>जल आवश्यकता</span>
                      <span className="font-medium text-green-600">कम</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  विस्तृत जानकारी
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>जलवायु-स्मार्ट खेती सिफारिशें</CardTitle>
          <CardDescription>Google Earth Engine के जलवायु परिवर्तन डेटा के आधार पर</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">फसल विविधीकरण</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                जलवायु परिवर्तन के प्रभावों को कम करने के लिए, एक ही फसल पर निर्भर रहने के बजाय विभिन्न फसलों का मिश्रण उगाएं।
              </p>
              <ul className="mt-3 grid gap-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>मुख्य फसल: धान या मक्का</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>दलहन: अरहर या मूंग</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>तिलहन: तिल या सोयाबीन</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium">जल संरक्षण तकनीकें</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Google Earth Engine डेटा से पता चलता है कि आपके क्षेत्र में वर्षा में कमी आ रही है। इन तकनीकों को अपनाएं:
              </p>
              <ul className="mt-3 grid gap-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>वर्षा जल संचयन संरचनाएं बनाएं</span>
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

            <div className="rounded-lg border p-4">
              <h3 className="font-medium">मिट्टी स्वास्थ्य प्रबंधन</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                जलवायु परिवर्तन के प्रभावों को कम करने के लिए स्वस्थ मिट्टी महत्वपूर्ण है:
              </p>
              <ul className="mt-3 grid gap-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>जैविक खाद और कम्पोस्ट का उपयोग करें</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>हरी खाद की खेती करें</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>फसल चक्र अपनाएं</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium">सूखा प्रतिरोधी किस्में</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                बढ़ते तापमान और कम होती वर्षा के लिए इन किस्मों की सिफारिश की जाती है:
              </p>
              <ul className="mt-3 grid gap-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>धान: सहभागी धान 42, DRR-44</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>गेहूं: HD-2967, HD-3086</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>मक्का: DMH-7, PMH-1</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

