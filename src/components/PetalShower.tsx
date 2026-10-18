import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PetalShowerProps {
  active: boolean;
  durationSeconds?: number;
  onComplete?: () => void;
  count?: number;
}

interface PetalItem {
  id: number;
  x: number; // percentage across screen
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  type: 'marigold' | 'jasmine' | 'rose';
  swayX: number;
}

export const PetalShower: React.FC<PetalShowerProps> = ({
  active,
  durationSeconds = 4,
  onComplete,
  count = 24, // strictly <= 25 on mobile
}) => {
  const [visible, setVisible] = useState<boolean>(active);

  useEffect(() => {
    if (active) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, durationSeconds * 1000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [active, durationSeconds, onComplete]);

  // Generate lightweight particle definitions once
  const petals: PetalItem[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i * 97) % 96 + 2, // evenly distributed with pseudorandom spread
      delay: (i % 6) * 0.25,
      duration: 3 + ((i % 5) * 0.4),
      size: 14 + (i % 8) * 2,
      rotation: (i * 45) % 360,
      type: i % 3 === 0 ? 'jasmine' : i % 3 === 1 ? 'marigold' : 'rose',
      swayX: ((i % 2 === 0 ? 1 : -1) * (20 + (i % 30))),
    }));
  }, [count]);

  return (
    <AnimatePresence>
      {visible && (
        <div
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
          aria-hidden="true"
        >
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute top-[-40px]"
              style={{ left: `${petal.x}%` }}
              initial={{ y: -40, x: 0, rotate: petal.rotation, opacity: 0 }}
              animate={{
                y: '105vh',
                x: [0, petal.swayX, -petal.swayX * 0.7, petal.swayX * 0.5],
                rotate: petal.rotation + 360,
                opacity: [0, 1, 1, 0.2],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                ease: 'linear',
              }}
            >
              {petal.type === 'marigold' && (
                <svg
                  width={petal.size}
                  height={petal.size}
                  viewBox="0 0 30 30"
                  fill="none"
                  className="drop-shadow-sm"
                >
                  {/* Marigold Petal cluster (బంతి రేకులు) */}
                  <ellipse cx="15" cy="15" rx="7" ry="13" fill="#f59e0b" transform="rotate(20 15 15)" />
                  <ellipse cx="15" cy="15" rx="7" ry="13" fill="#fbbf24" transform="rotate(70 15 15)" />
                  <ellipse cx="15" cy="15" rx="7" ry="13" fill="#d97706" transform="rotate(130 15 15)" />
                  <circle cx="15" cy="15" r="4" fill="#b45309" />
                </svg>
              )}

              {petal.type === 'jasmine' && (
                <svg
                  width={petal.size}
                  height={petal.size}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-sm"
                >
                  {/* Jasmine single petal (మల్లె రేకు) */}
                  <path
                    d="M12,2 C7,8 7,16 12,22 C17,16 17,8 12,2 Z"
                    fill="#fefcf7"
                    stroke="#dfb86c"
                    strokeWidth="0.5"
                  />
                  <line x1="12" y1="5" x2="12" y2="19" stroke="#e5e7eb" strokeWidth="0.5" />
                </svg>
              )}

              {petal.type === 'rose' && (
                <svg
                  width={petal.size * 0.9}
                  height={petal.size * 0.9}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-sm"
                >
                  {/* Pink/Red Rose petal (గులాబీ రేకు) */}
                  <path
                    d="M12,3 C5,6 3,15 12,22 C21,15 19,6 12,3 Z"
                    fill="#be123c"
                    opacity="0.9"
                  />
                  <path
                    d="M12,5 C7,8 5,14 12,19 C19,14 17,8 12,5 Z"
                    fill="#e11d48"
                    opacity="0.6"
                  />
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};
