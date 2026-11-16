"use client";

import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { intro, questions, result, reveal, stats } from "@/content/quiz";
import { completeParticipant, startParticipant } from "@/lib/participants";
import { ZodiacWheel } from "./ZodiacWheel";

type Stage = "intro" | "question" | "reveal" | "result";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const ADVANCE_DELAY_MS = 550;

const screen = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -24, filter: "blur(8px)" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export function Quiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [name, setName] = useState("");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const participant = useRef<Promise<string | null> | null>(null);

  const begin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setName(trimmed);
    participant.current = startParticipant(trimmed);
    setIndex(0);
    setSelected(null);
    setStage("question");
  };

  const choose = (option: number) => {
    if (selected !== null) return; // geçiş sırasında çift tıklamayı engelle
    setSelected(option);
    setTimeout(() => {
      setSelected(null);
      if (index < questions.length - 1) {
        setIndex(index + 1);
      } else {
        participant.current?.then((id) => {
          if (id) completeParticipant(id);
        });
        setStage("reveal");
      }
    }, ADVANCE_DELAY_MS);
  };

  const restart = () => {
    participant.current = null;
    setStage("intro");
  };

  return (
    <main className="relative z-10 flex min-h-dvh w-full items-center justify-center px-4 py-10 sm:px-6">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.section key="intro" {...screen} className="flex w-full max-w-xl flex-col items-center text-center">
            <div className="relative mb-6 size-40 sm:size-48">
              <ZodiacWheel className="absolute inset-0 size-full animate-[spin_90s_linear_infinite]" />
              <div className="absolute inset-0 grid place-items-center text-5xl text-gold drop-shadow-[0_0_18px_var(--color-gold)]">
                ☾
              </div>
            </div>
            <p className="font-display text-xs tracking-[0.4em] text-gold/80 uppercase">{intro.eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-balance text-shimmer sm:text-5xl">
              {intro.title}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-mist text-pretty sm:text-xl">{intro.subtitle}</p>

            <dl className="mt-8 grid w-full grid-cols-3 gap-2 sm:gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-gold/15 bg-white/[0.03] px-2 py-3 backdrop-blur-sm">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-lg text-gold sm:text-2xl">
                    <CountUp value={s.value} percent={s.percent} />
                  </dd>
                  <dd className="mt-1 text-sm leading-tight text-mist sm:text-base">{s.label}</dd>
                </div>
              ))}
            </dl>

            <form onSubmit={begin} className="mt-10 flex w-full max-w-sm flex-col gap-4">
              <label htmlFor="name" className="font-display text-sm tracking-widest text-gold/90">
                {intro.namePrompt}
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                autoComplete="given-name"
                placeholder={intro.namePlaceholder}
                className="w-full rounded-full border border-gold/30 bg-white/5 px-6 py-4 text-center text-xl text-starlight backdrop-blur-md transition outline-none placeholder:text-mist/50 focus:border-gold/80 focus:shadow-[0_0_30px_-6px_var(--color-gold)]"
              />
              <button
                type="submit"
                disabled={!name.trim()}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep px-8 py-4 font-display text-sm font-semibold tracking-[0.25em] text-night uppercase shadow-[0_0_40px_-8px_var(--color-gold)] transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                <span className="relative z-10">{intro.cta}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </form>
          </motion.section>
        )}

        {stage === "question" && (
          <motion.section key="question" {...screen} className="w-full max-w-2xl">
            <Progress current={index} />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40, rotateY: -8 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -40, rotateY: 8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="card mt-8 p-6 sm:p-10"
              >
                <p className="text-center font-display text-sm tracking-[0.35em] text-gold/80">
                  {ROMAN[index] ?? index + 1} · {ROMAN[questions.length - 1] ?? questions.length}
                </p>
                <h2 className="mt-4 text-center font-display text-2xl leading-snug text-balance text-starlight sm:text-3xl">
                  {questions[index].text}
                </h2>
                <p className="mt-3 text-center text-lg text-mist/80 italic">
                  {name}, kalbinin sesini dinle…
                </p>
                <div
                  className={`mt-8 grid gap-3 ${
                    questions[index].options.length > 6 ? "compact grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2"
                  }`}
                >
                  {questions[index].options.map((option, i) => {
                    const isSelected = selected === i;
                    const isDimmed = selected !== null && !isSelected;
                    return (
                      <motion.button
                        key={i}
                        type="button"
                        onClick={() => choose(i)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: isDimmed ? 0.35 : 1, y: 0, scale: isSelected ? 1.03 : 1 }}
                        transition={{ delay: selected === null ? 0.1 + i * 0.07 : 0, duration: 0.35 }}
                        whileHover={selected === null ? { y: -3 } : undefined}
                        whileTap={{ scale: 0.97 }}
                        className={`option ${isSelected ? "option-selected" : ""}`}
                      >
                        <span
                          className="option-icon grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 text-lg text-gold"
                          style={option.color ? { color: option.color, textShadow: `0 0 12px ${option.color}` } : undefined}
                        >
                          {option.icon}
                        </span>
                        <span className="text-left text-lg leading-snug">{option.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.section>
        )}

        {stage === "reveal" && <Reveal key="reveal" onDone={() => setStage("result")} />}

        {stage === "result" && (
          <motion.section key="result" {...screen} className="w-full max-w-2xl">
            <div className="card relative overflow-hidden p-8 text-center sm:p-12">
              <ZodiacWheel className="pointer-events-none absolute top-1/2 left-1/2 size-[140%] -translate-x-1/2 -translate-y-1/2 animate-[spin_120s_linear_infinite] opacity-25" />
              <div className="relative">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-xl text-mist italic"
                >
                  {result.greeting.replace("{name}", name)}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 font-display text-4xl leading-tight text-balance text-shimmer sm:text-5xl"
                >
                  {result.title}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 120, damping: 14 }}
                  className="mx-auto mt-8 grid size-32 place-items-center rounded-full border border-gold/50 bg-gold/5 shadow-[0_0_60px_-10px_var(--color-gold)]"
                >
                  <div>
                    <p className="font-display text-4xl text-gold">
                      <CountUp value={result.compatibility.value} percent delay={1.6} />
                    </p>
                    <p className="text-sm tracking-widest text-mist uppercase">{result.compatibility.label}</p>
                  </div>
                </motion.div>

                <ul className="mt-10 space-y-3 text-left">
                  {result.traits.map((trait, i) => (
                    <motion.li
                      key={trait.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.2 + i * 0.35, duration: 0.6 }}
                      className="rounded-2xl border border-gold/15 bg-white/[0.04] p-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/50 font-display text-xl text-gold shadow-[0_0_20px_-6px_var(--color-gold)]">
                          {trait.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm tracking-wider text-mist uppercase">{trait.label}</p>
                          <p className="font-display text-lg leading-snug text-starlight sm:text-xl">{trait.value}</p>
                        </div>
                        <span className="font-display text-lg text-gold">%{trait.probability}</span>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold shadow-[0_0_10px_var(--color-gold)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${trait.probability}%` }}
                          transition={{ delay: 2.4 + i * 0.35, duration: 1.1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 + result.traits.length * 0.35, duration: 0.8 }}
                  className="mt-8 text-lg leading-relaxed text-pretty text-starlight/90 italic sm:text-xl"
                >
                  {result.note}
                </motion.p>
                <motion.button
                  type="button"
                  onClick={restart}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 + result.traits.length * 0.35 }}
                  className="mt-10 rounded-full border border-gold/40 px-8 py-3 font-display text-xs tracking-[0.3em] text-gold uppercase transition hover:border-gold hover:bg-gold/10"
                >
                  {result.restart}
                </motion.button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

function CountUp({ value, percent = false, delay = 0.3 }: { value: number; percent?: boolean; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const format = (n: number) =>
      percent
        ? `%${n.toLocaleString("tr-TR", { maximumFractionDigits: Number.isInteger(value) ? 0 : 1, minimumFractionDigits: Number.isInteger(value) ? 0 : 1 })}`
        : Math.round(n).toLocaleString("tr-TR");
    const controls = animate(0, value, {
      duration: 2,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        if (ref.current) ref.current.textContent = format(n);
      },
    });
    return () => controls.stop();
  }, [value, percent, delay]);

  return <span ref={ref} className="tabular-nums">{percent ? "%0" : "0"}</span>;
}

function Progress({ current }: { current: number }) {
  const total = questions.length;
  return (
    <div className="relative mx-auto flex max-w-md items-center justify-between px-2" aria-label={`Soru ${current + 1} / ${total}`}>
      <div className="absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-gold/15" />
      <motion.div
        className="absolute top-1/2 left-4 h-px -translate-y-1/2 bg-gradient-to-r from-gold/40 to-gold shadow-[0_0_8px_var(--color-gold)]"
        animate={{ width: `calc((100% - 2rem) * ${current / (total - 1)})` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {Array.from({ length: total }, (_, i) => (
        <motion.span
          key={i}
          className="relative grid size-4 place-items-center"
          animate={{ scale: i === current ? 1.5 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <span
            className={`size-2 rotate-45 transition-all duration-500 ${
              i <= current ? "bg-gold shadow-[0_0_10px_2px_var(--color-gold)]" : "bg-mist/25"
            }`}
          />
        </motion.span>
      ))}
    </div>
  );
}

function Reveal({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const messages = reveal.messages;

  useEffect(() => {
    if (step >= messages.length) {
      onDone();
      return;
    }
    const t = setTimeout(() => setStep(step + 1), 1500);
    return () => clearTimeout(t);
  }, [step, messages.length, onDone]);

  return (
    <motion.section {...screen} className="flex flex-col items-center text-center" aria-live="polite">
      <motion.div
        className="relative size-64 sm:size-80"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      >
        <ZodiacWheel className="size-full" />
      </motion.div>
      <motion.div
        className="absolute size-24 rounded-full bg-gold/30 blur-3xl"
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="mt-8 h-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="font-display text-xl tracking-wide text-gold sm:text-2xl"
          >
            {messages[Math.min(step, messages.length - 1)]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
