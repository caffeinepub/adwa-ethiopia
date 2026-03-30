import { Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAddChatMessage } from "../hooks/useQueries";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("when"))
    return "The Battle of Adwa took place on March 1, 1896.";
  if (q.includes("where"))
    return "The battle was fought near Adwa, in the Tigray region of northern Ethiopia.";
  if (q.includes("who"))
    return "Ethiopia was led by Emperor Menelik II and Empress Taytu Betul. Italy was led by General Oreste Baratieri.";
  if (q.includes("why"))
    return "Italy was attempting to colonize Ethiopia under the Treaty of Wuchale, which Ethiopia rejected.";
  if (q.includes("how"))
    return "Ethiopia's forces of ~100,000 soldiers surrounded and defeated the Italian army of ~17,000 troops.";
  if (q.includes("result") || q.includes("outcome"))
    return "Ethiopia decisively defeated Italy, preserving its independence and inspiring African anti-colonial movements worldwide.";
  if (q.includes("taytu") || q.includes("empress"))
    return "Empress Taytu Betul was a powerful strategist who played a key role in the Battle of Adwa, leading her own troops.";
  if (q.includes("menelik") || q.includes("emperor"))
    return "Emperor Menelik II united Ethiopian forces and led the country to a historic victory against Italian colonialism.";
  return "I can answer questions about when, where, who, why, how, result, Taytu, or Menelik. Try asking one of these!";
}

const quickChips = ["When?", "Who led?", "Where?", "What happened?"];

let msgId = 0;

export default function AIChatTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: msgId++,
      role: "assistant",
      text: "Hello! I'm your Adwa history guide. Ask me about the Battle of Adwa — try 'when', 'who', 'where', or 'what happened'!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { mutate: saveChatMessage } = useAddChatMessage();

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    const question = text.trim();
    if (!question) return;
    const response = getResponse(question);
    const userMsg: Message = { id: msgId++, role: "user", text: question };
    const botMsg: Message = { id: msgId++, role: "assistant", text: response };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    saveChatMessage({ question, response });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="px-4 pt-5 pb-3 shrink-0">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-1"
          style={{ color: "oklch(0.45 0.12 155)" }}
        >
          AI GUIDE
        </p>
        <h2
          className="font-display text-xl font-bold"
          style={{ color: "oklch(0.20 0.04 45)" }}
        >
          Ask About Adwa
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-2">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? {
                        background: "oklch(0.20 0.04 45)",
                        color: "oklch(0.90 0.015 80)",
                        borderBottomRightRadius: "4px",
                      }
                    : {
                        background: "white",
                        color: "oklch(0.22 0 0)",
                        boxShadow: "0 2px 8px rgba(42,26,18,0.10)",
                        borderBottomLeftRadius: "4px",
                      }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-2 flex gap-2 overflow-x-auto shrink-0">
        {quickChips.map((chip) => (
          <button
            type="button"
            key={chip}
            data-ocid="chat.secondary_button"
            onClick={() => sendMessage(chip)}
            className="shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors"
            style={{
              borderColor: "oklch(0.45 0.12 155)",
              color: "oklch(0.45 0.12 155)",
              background: "white",
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4 pt-1 shrink-0">
        <div
          className="flex gap-2 items-center bg-white rounded-xl px-3 py-2"
          style={{ boxShadow: "0 2px 12px rgba(42,26,18,0.10)" }}
        >
          <input
            data-ocid="chat.input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask a question..."
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: "oklch(0.22 0 0)" }}
          />
          <button
            type="button"
            data-ocid="chat.submit_button"
            onClick={() => sendMessage(input)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-opacity"
            style={{ background: "oklch(0.45 0.12 155)" }}
          >
            <Send size={14} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
