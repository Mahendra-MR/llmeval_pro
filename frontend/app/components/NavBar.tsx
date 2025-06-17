'use client';

import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import useNavToggle from '@/lib/useNavToggle';
import useThemeToggle from '@/lib/useThemeToggle';

export default function NavBar() {
  const { isOpen, toggleMenu, closeMenu } = useNavToggle();
  const { theme, toggleTheme, mounted } = useThemeToggle();

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-extrabold tracking-wide">LLMEval Dashboard</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/" text="Home" />
          <NavLink href="/upload" text="Upload" />
          <NavLink href="/inference" text="Try Prompt" />

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/20 transition"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/20 transition"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-100"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-4 space-y-4 shadow-inner animate-fade-in-down rounded-b-xl">
          <NavLinkMobile href="/" text="Home" onClick={closeMenu} />
          <NavLinkMobile href="/upload" text="Upload" onClick={closeMenu} />
          <NavLinkMobile href="/inference" text="Try Prompt" onClick={closeMenu} />

        </div>
      )}
    </nav>
  );
}

function NavLink({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="text-lg font-medium hover:text-yellow-200 transition"
    >
      {text}
    </Link>
  );
}

function NavLinkMobile({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-lg font-semibold hover:text-indigo-600 dark:hover:text-white transition"
    >
      {text}
    </Link>
  );
}
