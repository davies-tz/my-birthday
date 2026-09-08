import React from 'react';

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'amber' | 'red' | 'cyan' | 'none';
  interactive?: boolean;
  onClick?: () => void;
}

export const CyberCard: React.FC<CyberCardProps> = ({
  children,
  className = '',
  glow = 'amber',
  interactive = false,
  onClick,
}) => {
  const glowStyles = {
    amber: 'border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.08)] hover:border-amber-400/50',
    red: 'border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.08)] hover:border-red-400/50',
    cyan: 'border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.08)] hover:border-cyan-400/50',
    none: 'border-white/10 hover:border-white/20',
  }[glow];

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl sm:rounded-3xl bg-zinc-950/80 backdrop-blur-xl border ${glowStyles} transition-all duration-300 ${
        interactive ? 'cursor-pointer hover:-translate-y-1' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
