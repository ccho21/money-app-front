"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | null;
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 focus:ring-primary dark:bg-primary dark:hover:bg-primary/80",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
  };

  const variantClass = variant ? variants[variant] : "";

  return (
    <button className={cn(baseStyles, variantClass, className)} {...props}>
      {children}
    </button>
  );
}
