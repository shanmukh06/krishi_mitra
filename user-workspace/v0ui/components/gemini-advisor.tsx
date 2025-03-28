"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, StopCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function GeminiAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "नमस्ते! मैं आपका Gemini AI कृषि सलाहकार हूँ। आप मुझसे अपनी फसल, मौसम, या कृषि प्रथाओं के बारे में कोई भी प्रश्न पूछ सकते हैं।",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate Gemini API response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("फसल") || input.toLowerCase().includes("crop")) {
        response =
          "आपके क्षेत्र के लिए Google Earth Engine के उपग्रह डेटा के आधार पर, वर्तमान मौसम और मिट्टी की स्थिति के अनुसार धान की PB-1121 किस्म उपयुक्त होगी। यह किस्म कम पानी में भी अच्छी पैदावार देती है और इसकी अवधि 135-140 दिन है।"
      } else if (input.toLowerCase().includes("मौसम") || input.toLowerCase().includes("weather")) {
        response =
          "Google Earth Engine के अनुसार, अगले 7 दिनों में आपके क्षेत्र में 40-60mm वर्षा की संभावना है। कृपया फसल में सिंचाई की योजना तदनुसार बनाएं और यदि संभव हो तो वर्षा जल संचयन की व्यवस्था करें।"
      } else if (input.toLowerCase().includes("कीट") || input.toLowerCase().includes("pest")) {
        response =
          "उपग्रह छवियों के विश्लेषण से पता चलता है कि आपके क्षेत्र में ब्राउन प्लांट हॉपर का प्रकोप बढ़ रहा है। कृपया एकीकृत कीट प्रबंधन तकनीकों का उपयोग करें। नीम आधारित कीटनाशक 5ml/लीटर पानी में मिलाकर छिड़काव करें।"
      } else {
        response =
          "आपके प्रश्न के लिए धन्यवाद। Google Earth Engine और Gemini AI के माध्यम से मैं आपके क्षेत्र के लिए विशिष्ट जानकारी प्रदान कर सकता हूं। कृपया अपनी फसल, मौसम, या कृषि प्रथाओं के बारे में अधिक विशिष्ट प्रश्न पूछें।"
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleRecording = () => {
    // In a real implementation, this would use the Web Speech API
    // or a similar technology to record and transcribe speech
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Simulate starting recording
      setTimeout(() => {
        setInput("मेरे क्षेत्र के लिए कौन सी फसल उपयुक्त होगी?")
        setIsRecording(false)
      }, 3000)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gemini AI कृषि सलाहकार</CardTitle>
        <CardDescription>Google की Gemini AI से व्यक्तिगत कृषि सलाह प्राप्त करें</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className={`h-8 w-8 ${message.role === "assistant" ? "bg-green-100" : "bg-primary/10"}`}>
                    {message.role === "assistant" ? "AI" : "आप"}
                  </Avatar>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8 bg-green-100">AI</Avatar>
                  <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2 text-sm">Gemini सोच रहा है...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex w-full items-center gap-2"
        >
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={toggleRecording}
            className={isRecording ? "bg-red-100" : ""}
          >
            {isRecording ? <StopCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            placeholder="अपना प्रश्न यहां टाइप करें..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || isRecording}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

