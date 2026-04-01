import { CheckCircle, Clock, Trophy, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitScore } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Question {
  en: string;
  am: string;
  options: string[];
  correctIndex: number;
}
const TIMER_SECONDS = 6;

const questions: Question[] = [
  {
    en: "When was the Battle of Adwa fought?",
    am: "የአድዋ ቆርነት መቀ ተካሄደ?",
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
    am: "ቆርነቱ የተካሄደበት ቀታ የት ነው?",
    options: ["Addis Ababa", "Gondar", "Adwa"],
    correctIndex: 2,
  },
  {
    en: "Who won the battle?",
    am: "ቆርነቱን ማን አሾነፈ?",
    options: ["Italy", "Ethiopia", "Both"],
    correctIndex: 1,
  },
  {
    en: "Which country tried to colonize Ethiopia?",
    am: "ኢትዮጵያን ማን ሊቀኝ ሰሰ ሰሰ?",
    options: ["France", "Italy", "Britain"],
    correctIndex: 1,
  },
  {
    en: "Who was the Empress during Adwa?",
    am: "በአድዋ ጊወ ንግሥት ማን ነበር?",
    options: ["Empress Taytu", "Zewditu", "Seble Wongel"],
    correctIndex: 0,
  },
  {
    en: "What was the main cause of the war?",
    am: "የቆርነቱ ዋና ምክንያት ምን ነበር?",
    options: ["Trade", "Treaty disagreement", "Religion"],
    correctIndex: 1,
  },
  {
    en: "What treaty caused the conflict?",
    am: "የተጣለት ስምምነት ምን ነበር?",
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
    am: "አድዋ ምን ይወከላል?",
    options: ["Defeat", "Independence", "Trade"],
    correctIndex: 1,
  },
  {
    en: "Which continent was inspired by Adwa?",
    am: "አድዋ የተነሳሳ የተነሳሳት አህጉር የት ነው?",
    options: ["Europe", "Africa", "Asia"],
    correctIndex: 1,
  },
  {
    en: "What type of war was Adwa?",
    am: "አድዋ ምን ዓይነት ቆርነት ነበር?",
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
    am: "ስምምነቱ መቀ ተፈረመ?",
    options: ["1889", "1896", "1905"],
    correctIndex: 0,
  },
  {
    en: "What did Ethiopians show during the battle?",
    am: "በቆርነቱ ጊወ ኢትዮጵያዊያን ምን አሳዩ?",
    options: ["Fear", "Unity and strength", "Weakness"],
    correctIndex: 1,
  },
  {
    en: "What was the result of the battle?",
    am: "የቆርነቱ ውጤት ምን ነበር?",
    options: ["Italy won", "Ethiopia won", "No result"],
    correctIndex: 1,
  },
  {
    en: "Why is Adwa important today?",
    am: "አድዋ ዛረ ለምን አስፈላゞ?",
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

export default function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const { mutate: submitScore } = useSubmitScore();
  const headerRef = useScrollAnimation();

  useEffect(() => {
    if (finished || selected !== null) return;
    if (timeLeft <= 0) {
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

  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor =
    timeLeft > 3 ? "#078930" : timeLeft > 1 ? "#FCDD09" : "#DA121A";

  return (
    <div className="py-20 px-6" style={{ background: "oklch(0.12 0.01 250)" }}>
      <div className="max-w-2xl mx-auto">
        <div ref={headerRef} className="fade-in-up text-center mb-12">
          <div className="eth-stripe mx-auto mb-5" style={{ maxWidth: 60 }}>
            <div className="s-green" />
            <div className="s-yellow" />
            <div className="s-red" />
          </div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: "oklch(0.72 0.18 145)" }}
          >
            QUIZ
          </p>
          <h2
            className="font-display text-5xl md:text-6xl font-bold"
            style={{ color: "oklch(0.94 0.01 90)" }}
          >
            Test Your Knowledge
          </h2>
          <p
            className="text-base mt-4"
            style={{ color: "oklch(0.65 0.02 90)" }}
          >
            20 bilingual questions about the Battle of Adwa
          </p>
        </div>

        {finished ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl overflow-hidden text-center shadow-card"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
          >
            <div className="h-2 flex">
              <div className="flex-1" style={{ background: "#078930" }} />
              <div className="flex-1" style={{ background: "#FCDD09" }} />
              <div className="flex-1" style={{ background: "#DA121A" }} />
            </div>
            <div className="p-10">
              <Trophy
                size={52}
                className="mx-auto mb-4"
                style={{
                  color: score === questions.length ? "#FCDD09" : "#078930",
                }}
              />
              <h3
                className="text-4xl font-bold mb-2"
                style={{ color: "oklch(0.94 0.01 90)" }}
              >
                {score}/{questions.length}
              </h3>
              <p style={{ color: "oklch(0.65 0.02 90)" }}>
                {score === questions.length
                  ? "Perfect score! You're an Adwa expert! 🌟"
                  : "Great effort! Review the Learn section to improve."}
              </p>
              <button
                type="button"
                onClick={handleRestart}
                className="mt-6 px-8 py-3 rounded-xl font-bold text-white"
                style={{ background: "#078930" }}
              >
                Try Again
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Progress */}
            <div className="flex items-center gap-1 mb-4">
              {questions.map((pq, i) => (
                <div
                  key={pq.en}
                  className="flex-1 h-1.5 rounded-full"
                  style={{
                    background:
                      i < currentQ
                        ? "#078930"
                        : i === currentQ
                          ? "#FCDD09"
                          : "oklch(0.28 0.02 250)",
                  }}
                />
              ))}
              <span
                className="text-xs shrink-0 ml-2"
                style={{ color: "oklch(0.60 0.02 90)" }}
              >
                {currentQ + 1}/{questions.length}
              </span>
            </div>
            {/* Timer */}
            <div className="flex items-center gap-2 mb-5">
              <Clock size={14} style={{ color: timerColor }} />
              <div
                className="flex-1 h-2 rounded-full"
                style={{ background: "oklch(0.22 0.015 250)" }}
              >
                <motion.div
                  className="h-2 rounded-full"
                  style={{ background: timerColor }}
                  animate={{ width: `${timerPct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span
                className="text-xs font-bold w-8 text-right"
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
                <div
                  className="bg-card rounded-2xl p-6 mb-4"
                  style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                    borderTop: "4px solid #FCDD09",
                  }}
                >
                  <p
                    className="font-bold text-lg mb-1"
                    style={{ color: "oklch(0.94 0.01 90)" }}
                  >
                    {questions[currentQ].en}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.60 0.02 90)" }}
                  >
                    {questions[currentQ].am}
                  </p>
                </div>
                <div className="space-y-3">
                  {questions[currentQ].options.map((opt, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = idx === questions[currentQ].correctIndex;
                    const revealed = selected !== null;
                    let bg = "oklch(0.18 0.015 250)";
                    let border = "oklch(0.35 0.02 250)";
                    if (revealed) {
                      if (isCorrect) {
                        bg = "#e8f7ec";
                        border = "#078930";
                      } else if (isSelected) {
                        bg = "#fde8e8";
                        border = "#DA121A";
                      }
                    }
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleAnswer(idx)}
                        disabled={revealed}
                        className="w-full flex items-center gap-3 px-5 py-4 rounded-xl border text-left transition-all"
                        style={{
                          background: bg,
                          borderColor: border,
                          opacity:
                            revealed && !isCorrect && !isSelected ? 0.5 : 1,
                        }}
                      >
                        <span
                          className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shrink-0"
                          style={{
                            borderColor: border,
                            background: revealed
                              ? undefined
                              : "oklch(0.22 0.015 250)",
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: "oklch(0.94 0.01 90)" }}
                        >
                          {opt}
                        </span>
                        {revealed && isCorrect && (
                          <CheckCircle
                            size={16}
                            className="ml-auto shrink-0"
                            style={{ color: "oklch(0.72 0.18 145)" }}
                          />
                        )}
                        {revealed && isSelected && !isCorrect && (
                          <XCircle
                            size={16}
                            className="ml-auto shrink-0"
                            style={{ color: "#DA121A" }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                {selected === -1 && (
                  <p
                    className="text-center text-sm font-semibold mt-3"
                    style={{ color: "#DA121A" }}
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
                    className="mt-5 w-full py-4 rounded-xl font-bold text-white"
                    style={{ background: "#078930" }}
                  >
                    {currentQ + 1 >= questions.length
                      ? "See Results"
                      : "Next Question"}
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
