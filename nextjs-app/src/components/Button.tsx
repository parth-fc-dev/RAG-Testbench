import React from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-md h-11 px-8";

  const variantStyles = {
    primary:
      "bg-black dark:bg-white text-white dark:text-black shadow hover:bg-gray-800 dark:hover:bg-gray-200",
    secondary:
      "border border-black dark:border-white text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900",
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const ArrowIcon = () => (
    <svg
      className="arrow-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {children}
      <ArrowIcon />
    </button>
  );
}
