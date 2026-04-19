import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`bg-gray-50 border border-gray-200 p-6 ${className}`}>
      {title && (
        <h2 className="text-2xl font-semibold text-black mb-3">{title}</h2>
      )}
      <div className="text-gray-900">{children}</div>
    </div>
  );
}
