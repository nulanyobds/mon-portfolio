import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useReplayableInView } from "../../hooks/useReplayableInView";
import s from "../sections/Portfolio.module.css";

type Token = { text: string; className?: string };

function visibleTokens(tokens: Token[], count: number) {
  let offset = 0;
  return tokens.map((token, index) => {
    const visible = Math.max(0, Math.min(token.text.length, count - offset));
    offset += token.text.length;
    return (
      <span className={token.className} key={`${token.text}-${index}`}>
        {token.text.slice(0, visible)}
      </span>
    );
  });
}

export function MotionTitle({
  variable,
  lead,
  accent,
  tone = "orange",
}: {
  variable: string;
  lead: string;
  accent: string;
  tone?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const active = useReplayableInView(ref, {
    amount: 0.3,
    resetDelay: 180,
    rootMargin: "-10% 0px -10% 0px",
  });
  const [count, setCount] = useState(0);
  const separator = lead.endsWith("\n") || lead.endsWith(" ") ? "" : " ";
  const tokens = useMemo<Token[]>(
    () => [
      { text: "const", className: s.tokenKeyword },
      { text: " " },
      { text: variable, className: s.tokenVariable },
      { text: " " },
      { text: "=", className: s.tokenOperator },
      { text: " " },
      { text: "`", className: s.tokenPunctuation },
      { text: lead, className: s.tokenLead },
      { text: separator },
      { text: accent, className: s.tokenAccent },
      { text: "`;", className: s.tokenPunctuation },
    ],
    [accent, lead, separator, variable],
  );
  const total = tokens.reduce((sum, token) => sum + token.text.length, 0);

  useEffect(() => {
    if (reduced) {
      setCount(total);
      return;
    }
    if (!active) {
      setCount(0);
      return;
    }

    setCount(0);
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const speed = mobile ? 35 : 42;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setCount((current) => {
          if (current >= total) {
            window.clearInterval(timer);
            return total;
          }
          return current + 1;
        });
      }, speed);
    }, 100);

    return () => {
      window.clearTimeout(start);
      if (timer) window.clearInterval(timer);
    };
  }, [active, reduced, total]);

  const prefixLength = tokens
    .slice(0, 7)
    .reduce((sum, token) => sum + token.text.length, 0);
  const headingCount = Math.max(0, count - prefixLength);
  const headingTokens = tokens.slice(7);
  const complete = count >= total;
  const accessibleTitle = `${lead}${separator}${accent}`.replace(/\n/g, " ");

  return (
    <div
      ref={ref}
      className={s.codeTitle}
      data-motion-title={variable}
      data-motion-state={complete ? "final" : "typing"}
      data-tone={tone}
    >
      <h2 className="sr-only">{accessibleTitle}</h2>
      <div className={s.motionTitleReserve} aria-hidden="true">
        <div className={s.syntax}>
          <span className={s.tokenKeyword}>const</span>{" "}
          <span className={s.tokenVariable}>{variable}</span>{" "}
          <span className={s.tokenOperator}>=</span>{" "}
          <span className={s.tokenPunctuation}>{"`"}</span>
        </div>
        <div className={s.motionHeading}>
          <span className={s.tokenLead}>{lead}</span>
          {separator}
          <span className={s.tokenAccent}>{accent}</span>
          <span className={s.tokenPunctuation}>{"`;"}</span>
        </div>
      </div>
      <div className={s.motionTitleLayer} aria-hidden="true">
        <div className={s.syntax}>
          {visibleTokens(tokens.slice(0, 7), count)}
          {count < prefixLength && <span className={s.cursor} />}
        </div>
        <div className={s.motionHeading}>
          {visibleTokens(headingTokens, headingCount)}
          {count >= prefixLength && (
            <span
              className={`${s.cursor} ${complete ? s.cursorComplete : ""}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
