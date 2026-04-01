import { MessageCircle, Send, Star, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const STORAGE_KEY = "adwa_user_comments";
interface Comment {
  id: string;
  text: string;
  rating: number;
  timestamp: number;
}

function loadComments(): Comment[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveComments(c: Comment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}

function StarRating({
  value,
  onChange,
}: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const interactive = !!onChange;
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            className={
              interactive ? "transition-transform hover:scale-110" : ""
            }
            aria-label={`${star} star`}
          >
            <Star
              size={interactive ? 22 : 14}
              fill={filled ? "#FCDD09" : "none"}
              stroke={filled ? "#FCDD09" : "oklch(0.40 0.02 90)"}
              strokeWidth={1.8}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(loadComments);
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(0);
  const [thankYou, setThankYou] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const headerRef = useScrollAnimation();
  const formRef = useScrollAnimation();

  useEffect(() => {
    saveComments(comments);
  }, [comments]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || rating === 0) return;
    setComments((prev) => [
      {
        id: Date.now().toString(),
        text: trimmed,
        rating,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
    setInput("");
    setRating(0);
    setThankYou(true);
    setTimeout(() => setThankYou(false), 3000);
    textareaRef.current?.focus();
  };

  const canSubmit = input.trim().length > 0 && rating > 0;

  return (
    <div className="py-20 px-6" style={{ background: "oklch(0.14 0.01 250)" }}>
      <div className="max-w-3xl mx-auto">
        <div ref={headerRef} className="fade-in-up text-center mb-12">
          <div className="eth-stripe mx-auto mb-5" style={{ maxWidth: 60 }}>
            <div className="s-green" />
            <div className="s-yellow" />
            <div className="s-red" />
          </div>
          <MessageCircle
            size={32}
            className="mx-auto mb-3"
            style={{ color: "#FCDD09" }}
          />
          <h2
            className="font-display text-5xl md:text-6xl font-bold"
            style={{ color: "oklch(0.96 0.01 90)" }}
          >
            Comments & Experiences
          </h2>
          <p
            className="text-base mt-4"
            style={{ color: "oklch(0.65 0.02 90)" }}
          >
            Share your thoughts about the Battle of Adwa
          </p>
        </div>

        {/* Input form */}
        <div
          ref={formRef}
          className="fade-in-up bg-card rounded-2xl p-6 mb-8 shadow-card"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.72 0.18 145)" }}
          >
            Your Rating
          </p>
          <div className="mb-5">
            <StarRating value={rating} onChange={setRating} />
            {rating === 0 && (
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.65 0.02 90)" }}
              >
                Tap a star to rate
              </p>
            )}
          </div>
          <label
            htmlFor="comment-input"
            className="block text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: "oklch(0.72 0.18 145)" }}
          >
            Your Comment
          </label>
          <textarea
            id="comment-input"
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit();
            }}
            placeholder="Write about your experience or thoughts about the Battle of Adwa…"
            rows={4}
            className="w-full resize-none rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            style={{
              borderColor: "oklch(0.28 0.02 250)",
              color: "oklch(0.94 0.01 90)",
            }}
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs" style={{ color: "oklch(0.60 0.02 90)" }}>
              {rating === 0 ? "Please add a rating" : "Ctrl+Enter to submit"}
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
              style={{ background: "#078930", color: "white" }}
            >
              <Send size={14} />
              Submit
            </button>
          </div>
        </div>

        <AnimatePresence>
          {thankYou && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl px-4 py-3 text-center font-semibold text-sm mb-6"
              style={{ background: "#078930", color: "white" }}
            >
              Thank you for your feedback 🇪🇹
            </motion.div>
          )}
        </AnimatePresence>

        {comments.length > 0 && (
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#FCDD09" }}
            >
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </p>
            <div className="space-y-4">
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="rounded-2xl p-5 museum-card"
                    style={{ background: "oklch(0.19 0.01 250)" }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                            style={{ background: "oklch(0.22 0.05 45)" }}
                          >
                            🇪🇹
                          </div>
                          <span
                            className="text-xs"
                            style={{ color: "oklch(0.62 0.02 90)" }}
                          >
                            {new Date(comment.timestamp).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <StarRating value={comment.rating ?? 0} />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setComments((prev) =>
                            prev.filter((c) => c.id !== comment.id),
                          )
                        }
                        className="p-1 rounded"
                        aria-label="Delete"
                      >
                        <Trash2
                          size={14}
                          style={{ color: "oklch(0.62 0.02 90)" }}
                        />
                      </button>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.28 0.02 250)" }}
                    >
                      {comment.text}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {comments.length === 0 && (
          <div className="text-center py-10">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-sm" style={{ color: "oklch(0.62 0.02 90)" }}>
              Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
