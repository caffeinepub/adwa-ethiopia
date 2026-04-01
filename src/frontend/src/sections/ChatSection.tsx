import { Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAddChatMessage } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

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

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: msgId++,
      role: "assistant",
      text: "Hello! I'm your Adwa history guide. Ask me about the Battle of Adwa — try 'when', 'who', 'where', or 'what happened'!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollAnimation();
  const { mutate: saveChatMessage } = useAddChatMessage();

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    const question = text.trim();
    if (!question) return;
    const response = getResponse(question);
    setMessages((prev) => [
      ...prev,
      { id: msgId++, role: "user", text: question },
      { id: msgId++, role: "assistant", text: response },
    ]);
    setInput("");
    saveChatMessage({ question, response });
  };

  return (
    <div className="py-20 px-6" style={{ background: "oklch(0.14 0.04 45)" }}>
      <div className="max-w-2xl mx-auto">
        <div ref={headerRef} className="fade-in-up text-center mb-12">
          <div className="eth-stripe mx-auto mb-5" style={{ maxWidth: 60 }}>
            <div className="s-green" />
            <div className="s-yellow" />
            <div className="s-red" />
          </div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: "#FCDD09" }}
          >
            AI GUIDE
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "oklch(0.95 0.008 80)" }}
          >
            Ask About Adwa
          </h2>
          <p
            className="text-base mt-4"
            style={{ color: "oklch(0.65 0.01 80)" }}
          >
            Your interactive history guide powered by AI
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.19 0.04 45)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
          }}
        >
          <div
            className="flex gap-2 px-4 py-3 overflow-x-auto"
            style={{ borderBottom: "1px solid oklch(0.25 0.04 45)" }}
          >
            {quickChips.map((chip) => (
              <button
                type="button"
                key={chip}
                onClick={() => sendMessage(chip)}
                className="shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors hover:bg-white/10"
                style={{ borderColor: "#078930", color: "#FCDD09" }}
              >
                {chip}
              </button>
            ))}
          </div>
          <div
            className="px-4 py-4 space-y-3"
            style={{ minHeight: 280, maxHeight: 400, overflowY: "auto" }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background: "#078930",
                            color: "white",
                            borderBottomRightRadius: 4,
                          }
                        : {
                            background: "oklch(0.23 0.04 45)",
                            color: "oklch(0.90 0.01 80)",
                            borderBottomLeftRadius: 4,
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
          <div className="px-4 pb-4">
            <div
              className="flex gap-2 items-center rounded-xl px-4 py-3"
              style={{ background: "oklch(0.23 0.04 45)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask a question..."
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "oklch(0.90 0.01 80)" }}
              />
              <button
                type="button"
                onClick={() => sendMessage(input)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "#078930" }}
              >
                <Send size={14} color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
