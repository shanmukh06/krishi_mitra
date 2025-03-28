"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const marketData = [
  { id: 1, crop: "गेहूँ", variety: "HD-2967", market: "आजादपुर मंडी", price: 2200, change: 50 },
  { id: 2, crop: "धान", variety: "पूसा बासमती", market: "नजफगढ़ मंडी", price: 3800, change: -30 },
  { id: 3, crop: "मक्का", variety: "देसी", market: "गाजीपुर मंडी", price: 2100, change: 20 },
  { id: 4, crop: "सोयाबीन", variety: "JS-335", market: "आजादपुर मंडी", price: 4300, change: 100 },
  { id: 5, crop: "चना", variety: "देसी", market: "नजफगढ़ मंडी", price: 5100, change: -50 },
  { id: 6, crop: "सरसों", variety: "पूसा बोल्ड", market: "गाजीपुर मंडी", price: 5600, change: 150 },
]

const priceHistoryData = [
  { month: "जन", wheat: 2050, rice: 3700, corn: 2000 },
  { month: "फर", wheat: 2100, rice: 3750, corn: 2050 },
  { month: "मार्च", wheat: 2150, rice: 3800, corn: 2080 },
  { month: "अप्रैल", wheat: 2180, rice: 3830, corn: 2100 },
  { month: "मई", wheat: 2150, rice: 3850, corn: 2080 },
  { month: "जून", wheat: 2200, rice: 3800, corn: 2100 },
]

export function MarketPrices() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>बाजार भाव</CardTitle>
          <CardDescription>प्रमुख मंडियों में फसलों के वर्तमान भाव</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input placeholder="फसल खोजें..." className="sm:max-w-xs" />
              <Select defaultValue="all">
                <SelectTrigger className="sm:max-w-[180px]">
                  <SelectValue placeholder="मंडी चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">सभी मंडियां</SelectItem>
                  <SelectItem value="azadpur">आजादपुर मंडी</SelectItem>
                  <SelectItem value="najafgarh">नजफगढ़ मंडी</SelectItem>
                  <SelectItem value="gazipur">गाजीपुर मंडी</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>फसल</TableHead>
                    <TableHead>किस्म</TableHead>
                    <TableHead>मंडी</TableHead>
                    <TableHead className="text-right">मूल्य (₹/क्विंटल)</TableHead>
                    <TableHead className="text-right">परिवर्तन</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.crop}</TableCell>
                      <TableCell>{item.variety}</TableCell>
                      <TableCell>{item.market}</TableCell>
                      <TableCell className="text-right">₹{item.price}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`flex items-center justify-end ${
                            item.change > 0 ? "text-green-600" : item.change < 0 ? "text-red-600" : ""
                          }`}
                        >
                          {item.change > 0 ? (
                            <ArrowUp className="mr-1 h-4 w-4" />
                          ) : item.change < 0 ? (
                            <ArrowDown className="mr-1 h-4 w-4" />
                          ) : null}
                          {Math.abs(item.change)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>मूल्य प्रवृत्ति</CardTitle>
          <CardDescription>पिछले 6 महीनों के भाव</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer
              config={{
                wheat: {
                  label: "गेहूँ",
                  color: "hsl(var(--chart-1))",
                },
                rice: {
                  label: "धान",
                  color: "hsl(var(--chart-2))",
                },
                corn: {
                  label: "मक्का",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="wheat" stroke="var(--color-wheat)" strokeWidth={2} />
                  <Line type="monotone" dataKey="rice" stroke="var(--color-rice)" strokeWidth={2} />
                  <Line type="monotone" dataKey="corn" stroke="var(--color-corn)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

