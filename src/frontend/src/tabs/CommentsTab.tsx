import { MessageCircle, Send, Star, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

function saveComments(comments: Comment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
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
              fill={filled ? "oklch(0.72 0.18 70)" : "none"}
              stroke={filled ? "oklch(0.72 0.18 70)" : "oklch(0.70 0.02 80)"}
              strokeWidth={1.8}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function CommentsTab() {
  const [comments, setComments] = useState<Comment[]>(loadComments);
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(0);
  const [thankYou, setThankYou] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    saveComments(comments);
  }, [comments]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || rating === 0) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      text: trimmed,
      rating,
      timestamp: Date.now(),
    };
    setComments((prev) => [newComment, ...prev]);
    setInput("");
    setRating(0);
    setThankYou(true);
    setTimeout(() => setThankYou(false), 3000);
    textareaRef.current?.focus();
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const canSubmit = input.trim().length > 0 && rating > 0;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.96 0.01 80)" }}>
      {/* Header */}
      <div
        className="px-4 pt-8 pb-6"
        style={{ background: "oklch(0.22 0.05 45)" }}
      >
        <div className="flex items-center gap-3 mb-1">
          <MessageCircle size={24} style={{ color: "oklch(0.72 0.12 70)" }} />
          <h1
            className="font-display text-lg font-bold tracking-wider uppercase"
            style={{ color: "oklch(0.90 0.015 80)" }}
          >
            Comments & Experiences
          </h1>
        </div>
        <p className="text-xs pl-9" style={{ color: "oklch(0.65 0.015 80)" }}>
          Share your thoughts about the Battle of Adwa
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Input Card */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "white",
            boxShadow: "0 2px 12px rgba(42,26,18,0.10)",
          }}
        >
          {/* Star Rating */}
          <p
            className="text-xs font-semibold tracking-wider uppercase mb-2"
            style={{ color: "oklch(0.45 0.08 45)" }}
          >
            Your Rating
          </p>
          <div className="mb-4">
            <StarRating value={rating} onChange={setRating} />
            {rating === 0 && (
              <p
                className="text-[10px] mt-1"
                style={{ color: "oklch(0.65 0.015 80)" }}
              >
                Tap a star to rate
              </p>
            )}
          </div>

          <label
            htmlFor="comment-input"
            className="block text-xs font-semibold tracking-wider uppercase mb-2"
            style={{ color: "oklch(0.45 0.08 45)" }}
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
            className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-amber-500"
            style={{
              borderColor: "oklch(0.85 0.02 80)",
              color: "oklch(0.22 0 0)",
              background: "oklch(0.98 0.005 80)",
            }}
          />
          <div className="flex items-center justify-between mt-3">
            <span
              className="text-[10px]"
              style={{ color: "oklch(0.65 0.015 80)" }}
            >
              {rating === 0 ? "Please add a rating" : "Ctrl+Enter to submit"}
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 disabled:opacity-40"
              style={{
                background: "oklch(0.72 0.12 70)",
                color: "oklch(0.15 0 0)",
              }}
            >
              <Send size={14} />
              Submit
            </button>
          </div>
        </div>

        {/* Thank You Banner */}
        <AnimatePresence>
          {thankYou && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl px-4 py-3 text-center font-semibold text-sm"
              style={{
                background: "oklch(0.35 0.13 155)",
                color: "white",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              }}
            >
              Thank you for your feedback 🇪🇹
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comments List */}
        {comments.length > 0 && (
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "oklch(0.50 0.02 80)" }}
            >
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </p>
            <div className="space-y-3">
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl p-4"
                    style={{
                      background: "white",
                      boxShadow: "0 2px 12px rgba(42,26,18,0.08)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-1 mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={{
                              background: "oklch(0.22 0.05 45)",
                              color: "oklch(0.72 0.12 70)",
                            }}
                          >
                            🇪🇹
                          </div>
                          <span
                            className="text-xs"
                            style={{ color: "oklch(0.60 0.02 80)" }}
                          >
                            {formatDate(comment.timestamp)}
                          </span>
                        </div>
                        <div className="pl-9">
                          <StarRating value={comment.rating ?? 0} />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(comment.id)}
                        className="p-1 rounded transition-colors hover:bg-red-50 flex-shrink-0"
                        style={{ color: "oklch(0.65 0.015 80)" }}
                        aria-label="Delete comment"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.22 0 0)" }}
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
            <p className="text-3xl mb-2">💬</p>
            <p className="text-sm" style={{ color: "oklch(0.55 0.02 80)" }}>
              Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
