"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import logo from "@/public/main-logo.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-gray-200 bg-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              src={logo}
              fill
              alt="InterviewAI logo"
              className="object-contain"
            />
          </div>

          <span className="text-xl font-bold text-indigo-600 sm:text-2xl">
            InterviewAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 md:flex">
          <Link href="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <span className="text-2xl">✕</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="border-t border-gray-200 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-white hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
