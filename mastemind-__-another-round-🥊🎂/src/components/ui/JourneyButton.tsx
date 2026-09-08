import React from 'react';
import { playClick } from '../../utils/audio';

interface JourneyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const JourneyButton: React.FC<JourneyButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const handleClick = () => {
    if (!disabled) {
      playClick();
      onClick?.();
    }
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 hover:from-amber-400 hover:to-red-400 text-black font-extrabold shadow-[0_0_25px_rgba(245,158,11,0.25)] border-transparent',
    secondary:
      'bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold border-white/10 hover:border-white/25',
    danger:
      'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold shadow-[0_0_25px_rgba(239,68,68,0.25)]',
    ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/[0.04]',
  }[variant];

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5',
  }[size];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-sans tracking-wide transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </button>
  );
};
