import React, { useEffect, useRef } from 'react';

interface InteractiveDotGridProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  glowColor?: string;
  proximity?: number;
}

export const InteractiveDotGrid: React.FC<InteractiveDotGridProps> = ({
  className = '',
  dotSize = 0.55,                             // Ultra-fine micro-dots
  gap = 8,                                    // High-density matrix = thousands of precision dots
  baseColor = 'rgba(0, 114, 188, 0.22)',      // Refined technical blue resting dots
  activeColor = '#0b63d6',                    // High-tech electric blue on hover
  glowColor = 'rgba(0, 163, 224, 0.85)',      // Luminous cyan glow
  proximity = 75,                             // Cursor interaction radius
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseInside = false;
    let time = 0;

    interface DotState {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      currentScale: number;
      targetScale: number;
      currentColor: number;
    }

    let dots: DotState[] = [];

    const initDots = () => {
      dots = [];
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;

      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * gap;
          const y = offsetY + r * gap;
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            currentScale: 1,
            targetScale: 1,
            currentColor: 0,
          });
        }
      }
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initDots();
    };

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
        mouseX = x;
        mouseY = y;
        isMouseInside = true;
      } else {
        isMouseInside = false;
        mouseX = -9999;
        mouseY = -9999;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      isMouseInside = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      isMouseInside = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const proxSq = proximity * proximity;
      const activeDots: DotState[] = [];

      ctx.beginPath();
      ctx.fillStyle = baseColor;
      ctx.shadowBlur = 0;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        if (isMouseInside) {
          const dx = mouseX - dot.x;
          const dy = mouseY - dot.y;

          if (Math.abs(dx) <= proximity && Math.abs(dy) <= proximity) {
            const distSq = dx * dx + dy * dy;
            if (distSq < proxSq) {
              const factor = 1 - Math.sqrt(distSq) / proximity;
              // Smooth bell-curve scale up on hover
              dot.targetScale = 1 + factor * 2.8;
              dot.currentColor = Math.min(1, dot.currentColor + factor * 0.45);
            } else {
              dot.targetScale = 1;
              dot.currentColor = Math.max(0, dot.currentColor - 0.08);
            }
          } else {
            dot.targetScale = 1;
            dot.currentColor = Math.max(0, dot.currentColor - 0.08);
          }
        } else {
          dot.targetScale = 1;
          dot.currentColor = Math.max(0, dot.currentColor - 0.05);
        }

        // Smooth physics-like lerp transition
        dot.currentScale += (dot.targetScale - dot.currentScale) * 0.22;

        if (dot.currentColor > 0.04 || dot.currentScale > 1.05) {
          activeDots.push(dot);
        } else {
          ctx.moveTo(dot.x + dotSize, dot.y);
          ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        }
      }

      ctx.fill();

      // Render glowing active dots with electric aura
      for (let j = 0; j < activeDots.length; j++) {
        const aDot = activeDots[j];
        const radius = dotSize * aDot.currentScale;

        ctx.beginPath();
        ctx.arc(aDot.x, aDot.y, radius, 0, Math.PI * 2);
        ctx.shadowBlur = aDot.currentColor * 8;
        ctx.shadowColor = glowColor;
        ctx.fillStyle = activeColor;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dotSize, gap, baseColor, activeColor, glowColor, proximity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
