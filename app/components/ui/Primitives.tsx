import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import manifest from "../../assets/manifest.json";
import s from "../sections/Portfolio.module.css";
const urls = import.meta.glob("../../assets/images/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
export function Asset({
  index,
  alt = "",
  className = "",
  eager = false,
}: {
  index: number;
  alt?: string;
  className?: string;
  eager?: boolean;
}) {
  const size = manifest.find((a) => a.index === index);
  return (
    <img
      src={urls["../../assets/images/asset-" + index + ".webp"]}
      width={size?.width}
      height={size?.height}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
}
export function Button({
  children = "Me contacter",
  href = "#contact",
  dark = false,
}: {
  children?: ReactNode;
  href?: string;
  dark?: boolean;
}) {
  return (
    <a href={href} className={s.button + " " + (dark ? s.darkButton : "")}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
export function ArrowLink({
  label,
  href = "#contact",
}: {
  label: string;
  href?: string;
}) {
  return (
    <a className={s.arrow} href={href} aria-label={label}>
      <ArrowUpRight aria-hidden="true" size={22} />
    </a>
  );
}
export function Brand({ href = "#accueil" }: { href?: string }) {
  return (
    <a href={href} aria-label="BeDev — Accueil" className={s.brand}>
      BeDev<span>.</span>
    </a>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className={s.eyebrow}>
      <span />
      {children}
    </div>
  );
}
