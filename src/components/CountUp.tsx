import { useState, useEffect } from 'react';

interface CountUpProps {
  initial: number;
  final: number;
  decimals?: number;
  duration?: number;
}

export const CountUp = ({ initial, final, decimals = 0, duration = 1500 }: CountUpProps) => {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Función de easing suave
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = initial + (final - initial) * easeOutCubic;
      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    // Pequeño delay antes de comenzar
    const timer = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [initial, final, duration, decimals]);

  return <span>{count}</span>;
};