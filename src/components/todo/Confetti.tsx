import { useEffect, useState } from "react";

const COLORS = [
  "#f87171", "#fb923c", "#fbbf24",
  "#34d399", "#60a5fa", "#a78bfa", "#f472b6",
];
const PARTICLE_COUNT = 32;

interface Particle {
  id: number;
  color: string;
  tx: number;
  ty: number;
  rotate: number;
  size: number;
  duration: number;
  delay: number;
  round: boolean;
}

interface Props {
  onDone: () => void;
}

export function Confetti({ onDone }: Props) {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      tx: Math.random() * 160 - 80,
      ty: -(Math.random() * 100 + 40),
      rotate: Math.random() * 540 - 270,
      size: Math.random() * 6 + 4,
      duration: Math.random() * 0.4 + 0.6,
      delay: Math.random() * 0.25,
      round: Math.random() > 0.5,
    }))
  );

  useEffect(() => {
    const maxMs =
      Math.max(...particles.map((p) => p.duration + p.delay)) * 1000 + 100;
    const timer = setTimeout(onDone, maxMs);
    return () => clearTimeout(timer);
  }, [onDone, particles]);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={
            {
              left: "24px",
              top: "24px",
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.round ? "50%" : "2px",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--rotate": `${p.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
