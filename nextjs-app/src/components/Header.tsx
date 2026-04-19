"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  brand?: string;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/testbench", label: "Testbench" },
  { href: "/learning", label: "Learning" },
  { href: "/about", label: "About" },
];

export default function Header({
  brand = "RAG Testbench",
  navItems = defaultNavItems,
}: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-black">{brand}</div>
          <div className="flex space-x-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-black hover:text-gray-600 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
