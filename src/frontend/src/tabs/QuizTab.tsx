import { CheckCircle, Clock, Trophy, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitScore } from "../hooks/useQueries";

interface Question {
  en: string;
  am: string;
  options: string[];
  correctIndex: number;
}

const TIMER_SECONDS = 20;

const questions: Question[] = [
  {
    en: "When was the Battle of Adwa fought?",
    am: "የአድዋ ጦርነት መቼ ተካሄደ?",
    options: ["1889", "1896", "1900"],
    correctIndex: 1,
  },
  {
    en: "Who led Ethiopia?",
    am: "ኢትዮጵያን ማን መራ?",
    options: ["Menelik II", "Haile Selassie", "Tewodros II"],
    correctIndex: 0,
  },
  {
    en: "Where did the battle take place?",
    am: "ጦርነቱ የተካሄደበት ቦታ የት ነው?",
    options: ["Addis Ababa", "Gondar", "Adwa"],
    correctIndex: 2,
  },
  {
    en: "Who won the battle?",
    am: "ጦርነቱን ማን አሸነፈ?",
    options: ["Italy", "Ethiopia", "Both"],
    correctIndex: 1,
  },
  {
    en: "Which country tried to colonize Ethiopia?",
    am: "ኢትዮጵያን ማን ሊቀኝ ሞከረ?",
    options: ["France", "Italy", "Britain"],
    correctIndex: 1,
  },
  {
    en: "Who was the Empress during Adwa?",
    am: "በአድዋ ጊዜ ንግሥት ማን ነበር?",
    options: ["Empress Taytu", "Zewditu", "Seble Wongel"],
    correctIndex: 0,
  },
  {
    en: "What was the main cause of the war?",
    am: "የጦርነቱ ዋና ምክንያት ምን ነበር?",
    options: ["Trade", "Treaty disagreement", "Religion"],
    correctIndex: 1,
  },
  {
    en: "What treaty caused the conflict?",
    am: "የተጣለው ስምምነት ምን ነበር?",
    options: ["Treaty of Wuchale", "Treaty of Paris", "Treaty of Rome"],
    correctIndex: 0,
  },
  {
    en: "What did Italy want?",
    am: "ጣሊያን ምን ፈለገች?",
    options: ["Peace", "Colonize Ethiopia", "Trade"],
    correctIndex: 1,
  },
  {
    en: "What does Adwa symbolize?",
    am: "አድዋ ምን ይወክላል?",
    options: ["Defeat", "Independence", "Trade"],
    correctIndex: 1,
  },
  {
    en: "Which continent was inspired by Adwa?",
    am: "አድዋ የተነሳ የተነሳሳው አህጉር የት ነው?",
    options: ["Europe", "Africa", "Asia"],
    correctIndex: 1,
  },
  {
    en: "What type of war was Adwa?",
    am: "አድዋ ምን ዓይነት ጦርነት ነበር?",
    options: ["Civil war", "Anti-colonial war", "Trade war"],
    correctIndex: 1,
  },
  {
    en: "What caused misunderstanding in the treaty?",
    am: "በስምምነቱ ያለ ግርግር ምን አመጣ?",
    options: ["Language difference", "Money", "War"],
    correctIndex: 0,
  },
  {
    en: "What did Ethiopia defend?",
    am: "ኢትዮጵያ ምን አስጠበቀች?",
    options: ["Trade", "Independence", "Land only"],
    correctIndex: 1,
  },
  {
    en: "Who rejected the treaty?",
    am: "ስምምነቱን ማን አልተቀበለም?",
    options: ["Menelik II", "Italy", "Britain"],
    correctIndex: 0,
  },
  {
    en: "When was the treaty signed?",
    am: "ስምምነቱ መቼ ተፈረመ?",
    options: ["1889", "1896", "1905"],
    correctIndex: 0,
  },
  {
    en: "What did Ethiopians show during the battle?",
    am: "በጦርነቱ ጊዜ ኢትዮጵያውያን ምን አሳዩ?",
    options: ["Fear", "Unity and strength", "Weakness"],
    correctIndex: 1,
  },
  {
    en: "What was the result of the battle?",
    am: "የጦርነቱ ውጤት ምን ነበር?",
    options: ["Italy won", "Ethiopia won", "No result"],
    correctIndex: 1,
  },
  {
    en: "Why is Adwa important today?",
    am: "አድዋ ዛሬ ለምን አስፈላጊ ነው?",
    options: ["Trade", "Freedom and pride", "War only"],
    correctIndex: 1,
  },
  {
    en: "What message does Adwa give?",
    am: "የአድዋ መልዕክት ምንድነው?",
    options: ["Give up", "Fight for freedom", "Ignore history"],
    correctIndex: 1,
  },
];

export default function QuizTab() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const { mutate: submitScore } = useSubmitScore();

  // Timer effect
  useEffect(() => {
    if (finished || selected !== null) return;
    if (timeLeft <= 0) {
      // Time's up — mark as wrong, move on
      setSelected(-1);
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, selected, finished]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[currentQ].correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    const isLast = currentQ + 1 >= questions.length;
    if (isLast) {
      const finalScore =
        selected === questions[currentQ].correctIndex ? score + 1 : score;
      submitScore(finalScore);
      toast.success(
        `Quiz complete! You scored ${finalScore}/${questions.length}`,
      );
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setTimeLeft(TIMER_SECONDS);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setTimeLeft(TIMER_SECONDS);
  };

  if (finished) {
    const perfect = score === questions.length;
    return (
      <div className="px-4 pt-5">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-1"
          style={{ color: "oklch(0.72 0.12 70)" }}
        >
          QUIZ
        </p>
        <h2
          className="font-display text-xl font-bold mb-6"
          style={{ color: "oklch(0.20 0.04 45)" }}
        >
          Results
        </h2>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl overflow-hidden text-center"
          style={{ boxShadow: "0 2px 12px rgba(42,26,18,0.10)" }}
        >
          <div
            className="h-2"
            style={{
              background: perfect
                ? "oklch(0.72 0.12 70)"
                : "oklch(0.35 0.13 20)",
            }}
          />
          <div className="p-8">
            <Trophy
              size={48}
              className="mx-auto mb-3"
              style={{
                color: perfect ? "oklch(0.72 0.12 70)" : "oklch(0.35 0.13 20)",
              }}
            />
            <h3
              className="font-display text-3xl font-bold mb-1"
              style={{ color: "oklch(0.20 0.04 45)" }}
            >
              {score}/{questions.length}
            </h3>
            <p className="text-sm" style={{ color: "oklch(0.50 0.02 80)" }}>
              {perfect
                ? "Perfect score! You're an Adwa expert! 🌟"
                : "Great effort! Review the Learn section to improve."}
            </p>
          </div>
        </motion.div>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-4 w-full py-3 rounded-xl font-bold text-sm"
          style={{
            background: "oklch(0.20 0.04 45)",
            color: "oklch(0.90 0.015 80)",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const q = questions[currentQ];
  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor =
    timeLeft > 10
      ? "oklch(0.45 0.12 155)"
      : timeLeft > 5
        ? "oklch(0.72 0.12 70)"
        : "oklch(0.55 0.20 25)";

  return (
    <div className="px-4 pt-5 pb-6">
      <p
        className="text-xs font-semibold tracking-widest uppercase mb-1"
        style={{ color: "oklch(0.72 0.12 70)" }}
      >
        QUIZ
      </p>
      <h2
        className="font-display text-xl font-bold mb-3"
        style={{ color: "oklch(0.20 0.04 45)" }}
      >
        Test Your Knowledge
      </h2>

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-3">
        {questions.map((pq, i) => (
          <div
            key={pq.en}
            className="flex-1 h-1.5 rounded-full"
            style={{
              background:
                i < currentQ
                  ? "oklch(0.45 0.12 155)"
                  : i === currentQ
                    ? "oklch(0.72 0.12 70)"
                    : "oklch(0.87 0.02 80)",
            }}
          />
        ))}
        <span
          className="text-xs shrink-0"
          style={{ color: "oklch(0.50 0.02 80)" }}
        >
          {currentQ + 1}/{questions.length}
        </span>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2 mb-4">
        <Clock size={14} style={{ color: timerColor }} />
        <div
          className="flex-1 h-2 rounded-full"
          style={{ background: "oklch(0.87 0.02 80)" }}
        >
          <motion.div
            className="h-2 rounded-full"
            style={{ background: timerColor }}
            animate={{ width: `${timerPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span
          className="text-xs font-bold w-6 text-right"
          style={{ color: timerColor }}
        >
          {timeLeft}s
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Question card */}
          <div
            className="bg-white rounded-xl p-5 mb-4"
            style={{ boxShadow: "0 2px 12px rgba(42,26,18,0.10)" }}
          >
            <div
              className="h-1 mb-4"
              style={{ background: "oklch(0.72 0.12 70)" }}
            />
            <p
              className="font-bold text-base mb-1"
              style={{ color: "oklch(0.20 0.04 45)" }}
            >
              {q.en}
            </p>
            <p className="text-sm" style={{ color: "oklch(0.48 0.04 80)" }}>
              {q.am}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {q.options.map((opt, idx) => {
              const isSelected = selected === idx;
              const isCorrect = idx === q.correctIndex;
              const revealed = selected !== null;
              let bg = "white";
              let border = "oklch(0.87 0.02 80)";
              if (revealed) {
                if (isCorrect) {
                  bg = "oklch(0.93 0.06 155)";
                  border = "oklch(0.45 0.12 155)";
                } else if (isSelected) {
                  bg = "oklch(0.95 0.05 20)";
                  border = "oklch(0.35 0.13 20)";
                }
              }
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleAnswer(idx)}
                  disabled={revealed}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all"
                  style={{
                    background: bg,
                    borderColor: border,
                    color: "oklch(0.22 0 0)",
                    boxShadow: "0 1px 4px rgba(42,26,18,0.06)",
                    opacity: revealed && !isCorrect && !isSelected ? 0.5 : 1,
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ borderColor: border }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm">{opt}</span>
                  {revealed && isCorrect && (
                    <CheckCircle
                      size={16}
                      className="ml-auto shrink-0"
                      style={{ color: "oklch(0.45 0.12 155)" }}
                    />
                  )}
                  {revealed && isSelected && !isCorrect && (
                    <XCircle
                      size={16}
                      className="ml-auto shrink-0"
                      style={{ color: "oklch(0.35 0.13 20)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Time's up message */}
          {selected === -1 && (
            <p
              className="text-center text-sm font-semibold mt-3"
              style={{ color: "oklch(0.55 0.20 25)" }}
            >
              ⏰ Time's up!
            </p>
          )}

          {selected !== null && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="mt-4 w-full py-3 rounded-xl font-bold text-sm"
              style={{
                background: "oklch(0.20 0.04 45)",
                color: "oklch(0.90 0.015 80)",
              }}
            >
              {currentQ + 1 >= questions.length
                ? "See Results"
                : "Next Question"}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
