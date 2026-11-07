"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/content";
import { siteConfig } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label={`${siteConfig.name}, ir al inicio`}>
          <svg className="brand-icon" width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <path
              d="M16 3l3.4 8.2 8.6.7-6.5 5.6 2 8.5L16 21.2 8.5 26l2-8.5L4 11.9l8.6-.7z"
              fill="currentColor"
            />
          </svg>
          <span>{siteConfig.name}</span>
        </a>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span className="nav-toggle-bar" aria-hidden="true" />
        </button>

        <nav id="menu-principal" className={`main-nav${open ? " is-open" : ""}`} aria-label="Principal">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
