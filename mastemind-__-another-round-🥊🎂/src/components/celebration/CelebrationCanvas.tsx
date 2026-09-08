import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface Balloon {
  x: number;
  y: number;
  speed: number;
  color: string;
  size: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
}

export const triggerBigCelebration = () => {
  // Fire multi-stage celebratory confetti
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors: ['#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#ffffff'],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors: ['#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#ffffff'],
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

export const triggerMiniPunchConfetti = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 35,
    spread: 60,
    origin: { x, y },
    colors: ['#ef4444', '#f59e0b', '#ffffff'],
    disableForReducedMotion: true,
  });
};

export const CelebrationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: FireworkParticle[] = [];
    const sparks: Spark[] = [];
    const balloons: Balloon[] = [];

    const balloonColors = [
      'rgba(239, 68, 68, 0.45)',  // red boxing
      'rgba(245, 158, 11, 0.45)', // gold
      'rgba(6, 182, 212, 0.35)',  // cyan cyber
      'rgba(168, 85, 247, 0.35)', // purple
    ];

    // Seed balloons
    for (let i = 0; i < 9; i++) {
      balloons.push({
        x: Math.random() * width,
        y: height + Math.random() * height * 0.8,
        speed: 0.4 + Math.random() * 0.6,
        color: balloonColors[i % balloonColors.length],
        size: 14 + Math.random() * 16,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.02,
        opacity: 0.25 + Math.random() * 0.35,
      });
    }

    const fireworkColors = ['#f59e0b', '#ef4444', '#38bdf8', '#fbbf24', '#e2e8f0', '#f43f5e'];

    // Spawn a gentle firework
    const spawnFirework = (targetX?: number, targetY?: number) => {
      const startX = targetX ?? (0.15 + Math.random() * 0.7) * width;
      const startY = targetY ?? (0.12 + Math.random() * 0.45) * height;
      const count = 35 + Math.floor(Math.random() * 25);
      const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 1.2 + Math.random() * 3.2;
        particles.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 0.9,
          color,
          size: 1.5 + Math.random() * 1.8,
          decay: 0.012 + Math.random() * 0.012,
        });
      }

      // Add a couple of firecracker sparks
      for (let j = 0; j < 8; j++) {
        sparks.push({
          x: startX + (Math.random() - 0.5) * 20,
          y: startY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          alpha: 1,
          color: '#fbbf24',
          size: 1.2 + Math.random() * 1.2,
        });
      }
    };

    let lastFireworkTime = Date.now();
    let fireworkInterval = 4500; // gentle, non-chaotic frequency

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Periodic gentle firework
      const now = Date.now();
      if (now - lastFireworkTime > fireworkInterval) {
        spawnFirework();
        lastFireworkTime = now;
        fireworkInterval = 4000 + Math.random() * 3000;
      }

      // Update & Draw Balloons
      for (const b of balloons) {
        b.y -= b.speed;
        b.wobble += b.wobbleSpeed;
        const currentX = b.x + Math.sin(b.wobble) * 22;

        if (b.y < -60) {
          b.y = height + 40;
          b.x = Math.random() * width;
        }

        ctx.save();
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.ellipse(currentX, b.y, b.size * 0.75, b.size, 0, 0, Math.PI * 2);
        ctx.fill();

        // Balloon string
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(currentX, b.y + b.size);
        ctx.quadraticCurveTo(currentX - 5, b.y + b.size + 15, currentX + 3, b.y + b.size + 30);
        ctx.stroke();
        ctx.restore();
      }

      // Update & Draw Firework Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035; // gentle gravity
        p.vx *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Update & Draw Firecracker Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.035;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.fillRect(s.x, s.y, s.size, s.size);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* Layer 3: Fireworks and Ambient Sparks Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Layer 4: Floating Celebratory Cues & Balloons */}
      <div className="absolute top-8 left-8 text-xl opacity-20 select-none animate-sparkle">
        ✨
      </div>
      <div className="absolute top-24 right-12 text-2xl opacity-25 select-none animate-sparkle" style={{ animationDelay: '1.2s' }}>
        🎂
      </div>
      <div className="absolute bottom-24 left-10 text-xl opacity-20 select-none animate-sparkle" style={{ animationDelay: '2.1s' }}>
        🥊
      </div>
      <div className="absolute bottom-32 right-14 text-2xl opacity-25 select-none animate-sparkle" style={{ animationDelay: '0.8s' }}>
        🎉
      </div>

      {/* Cyber ambient dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};
