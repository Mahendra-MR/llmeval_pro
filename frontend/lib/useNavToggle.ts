// lib/useNavToggle.ts
'use client';

import { useState } from 'react';

export default function useNavToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return { isOpen, toggleMenu, closeMenu };
}
