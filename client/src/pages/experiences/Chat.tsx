import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Save } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { translate } from "@/lib/translate";
import type { ChatMessage } from "@shared/types";

export default function Chat() {
  const { selectedPersona } = useAppStore();
  const [customerMessages, setCustomerMessages] = useState<ChatMessage[]>([
    {
      from: "customer",
      lang: "es-MX",
      text: "Hola, necesito ayuda con mi cuenta",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [agentMessages, setAgentMessages] = useState<ChatMessage[]>([
    {
      from: "agent",
      lang: "en",
      text: "Hello, I need help with my account",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [customerInput, setCustomerInput] = useState("");
  const [agentInput, setAgentInput] = useState("");
  const [sentiment] = useState<"positive" | "neutral" | "negative">("positive");

  const handleCustomerSend = async () => {
    if (!customerInput.trim()) return;

    const newMessage: ChatMessage = {
      from: "customer",
      lang: selectedPersona?.dialect || "es-MX",
      text: customerInput,
      timestamp: new Date().toISOString(),
    };

    setCustomerMessages([...customerMessages, newMessage]);

    // Translate to English for agent
    const translated = await translate({
      text: customerInput,
      from: selectedPersona?.dialect || "es-MX",
      to: "en",
    });

    setAgentMessages([
      ...agentMessages,
      {
        from: "customer",
        lang: "en",
        text: translated,
        timestamp: new Date().toISOString(),
      },
    ]);

    setCustomerInput("");
  };

  const handleAgentSend = async () => {
    if (!agentInput.trim()) return;

    const newMessage: ChatMessage = {
      from: "agent",
      lang: "en",
      text: agentInput,
      timestamp: new Date().toISOString(),
    };

    setAgentMessages([...agentMessages, newMessage]);

    // Translate to Spanish for customer
    const translated = await translate({
      text: agentInput,
      from: "en",
      to: selectedPersona?.dialect || "es-MX",
      dialect: selectedPersona?.dialect,
    });

    setCustomerMessages([
      ...customerMessages,
      {
        from: "agent",
        lang: selectedPersona?.dialect || "es-MX",
        text: translated,
        timestamp: new Date().toISOString(),
      },
    ]);

    setAgentInput("");
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500";
      case "negative":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Live Chat Translation</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Real-time dual-pane chat with automatic translation
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sentiment:</span>
            <Badge className={getSentimentColor(sentiment)}>
              {sentiment}
            </Badge>
          </div>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Transcript
          </Button>
        </div>
      </div>

      {selectedPersona && (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedPersona.avatar}</span>
              <div>
                <p className="font-semibold">{selectedPersona.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedPersona.dialectLabel}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer View (Spanish) */}
        <Card className="flex flex-col h-[600px]">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">👤</span>
              Customer View ({selectedPersona?.dialectLabel || "Spanish"})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {customerMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.from === "customer" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.from === "customer"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type message in Spanish..."
                value={customerInput}
                onChange={(e) => setCustomerInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCustomerSend()}
              />
              <Button onClick={handleCustomerSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agent View (English) */}
        <Card className="flex flex-col h-[600px]">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">👨‍💼</span>
              Agent View (English)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {agentMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.from === "agent" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.from === "agent"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type message in English..."
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAgentSend()}
              />
              <Button onClick={handleAgentSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

