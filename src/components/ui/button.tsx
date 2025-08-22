import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition ${className}`}
    >
      {children}
    </button>
  );
}
