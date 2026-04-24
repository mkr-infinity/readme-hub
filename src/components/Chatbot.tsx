import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  Settings as SettingsIcon,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { generateText, AiError, PROVIDERS } from "../utils/ai";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  isError?: boolean;
}

const Chatbot = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! I'm MKR Ai. Ask me anything about your studies — concepts, formulas, summaries, anything.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  if (state.user.aiEnabled === false) return null;

  const providerLabel =
    PROVIDERS.find((p) => p.id === (state.user.aiProvider || "gemini"))?.short ||
    "Gemini";

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await generateText(state.user, text);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: reply || "Hmm, I didn't get a reply. Try again?",
          sender: "bot",
        },
      ]);
    } catch (error: any) {
      const aiErr = error as AiError;
      const friendly =
        aiErr?.userMessage ||
        "Something went wrong. Try again, or add your own API key in Settings → AI.";
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: friendly,
          sender: "bot",
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="fixed z-50 size-14 rounded-2xl gradient-violet text-white shadow-glow flex items-center justify-center"
            style={{
              bottom: `calc(env(safe-area-inset-bottom) + 96px)`,
              right: `calc(env(safe-area-inset-right) + 16px)`,
            }}
            aria-label="Open MKR Ai"
          >
            <Bot size={26} />
            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-[var(--color-mint)] ring-2 ring-[var(--bg-app)]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed z-50 inset-x-3 bg-elevated border border-subtle rounded-3xl shadow-card-lg flex flex-col overflow-hidden"
            style={{
              bottom: `calc(env(safe-area-inset-bottom) + 96px)`,
              top: `calc(env(safe-area-inset-top) + 64px)`,
              maxWidth: 420,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* Header */}
            <div className="relative gradient-violet p-4 text-white">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/15 blur-2xl" />
              <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-black/20 blur-2xl" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <Bot size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight">MKR Ai</h3>
                    <p className="text-[10px] text-white/80 uppercase tracking-widest font-bold flex items-center gap-1">
                      <Sparkles size={10} /> Powered by {providerLabel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/settings");
                    }}
                    className="size-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                    aria-label="AI settings"
                  >
                    <SettingsIcon size={16} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="size-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-app">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="size-8 shrink-0 rounded-xl gradient-violet text-white flex items-center justify-center mr-2 shadow-card">
                      <Bot size={14} />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 text-[13px] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[var(--color-primary)] text-white rounded-3xl rounded-br-md shadow-card"
                        : msg.isError
                        ? "bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 rounded-3xl rounded-bl-md"
                        : "bg-surface-1 border border-subtle text-primary-fg rounded-3xl rounded-bl-md shadow-card"
                    }`}
                  >
                    {msg.isError && (
                      <div className="flex items-center gap-1.5 mb-1.5 text-[10px] uppercase tracking-widest font-bold">
                        <AlertCircle size={12} />
                        AI error
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    {msg.isError && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/settings");
                        }}
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-300 px-3 py-1.5 rounded-full hover:bg-rose-500/25 transition-colors"
                      >
                        <SettingsIcon size={11} /> Open AI Settings
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start items-end">
                  <div className="size-8 rounded-xl gradient-violet text-white flex items-center justify-center mr-2 shadow-card">
                    <Bot size={14} />
                  </div>
                  <div className="bg-surface-1 border border-subtle px-4 py-3 rounded-3xl rounded-bl-md flex gap-1.5">
                    <span className="size-1.5 bg-tertiary-fg rounded-full animate-bounce" />
                    <span
                      className="size-1.5 bg-tertiary-fg rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="size-1.5 bg-tertiary-fg rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-elevated border-t border-subtle flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={`Ask anything…`}
                className="flex-1 bg-surface-2 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="size-11 rounded-2xl bg-[var(--color-primary)] text-white disabled:opacity-40 active:scale-95 transition-transform flex items-center justify-center shadow-card"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
