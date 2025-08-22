import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-700 bg-slate-800 shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 border-b border-gray-700 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}
