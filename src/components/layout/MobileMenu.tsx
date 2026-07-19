"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function MobileMenu() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/pricing", label: t("pricing") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-foreground hover:bg-muted rounded-md transition-colors"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Portal for Backdrop and Drawer to prevent containing block issues (horizontal overflow) */}
      {mounted && createPortal(
        <div className="md:hidden">
          {/* Backdrop */}
          {isOpen && (
            <div
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm transition-opacity"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Slide-in Drawer */}
          <div
            className={`fixed inset-y-0 end-0 z-[100] w-full max-w-sm bg-background border-s border-border shadow-lg transition-transform duration-300 ease-in-out flex flex-col ${
              isOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
              <span className="text-xl font-bold tracking-tight text-foreground">Dexber</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-foreground hover:bg-muted rounded-md transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col p-4 space-y-4 overflow-y-auto flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-foreground hover:text-brand-blue transition-colors px-2 py-2 rounded-md hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-border flex flex-col gap-3">
                <Link href="/auth/signin" className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    {t("signIn")}
                  </Button>
                </Link>
                <Link href="/get-started" className="w-full">
                  <Button className="w-full justify-start">
                    {t("getStarted")}
                  </Button>
                </Link>
              </div>

              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <Link href={pathname} locale="en" className="hover:text-primary font-medium text-lg">EN</Link>
                  <span className="text-muted-foreground/30">|</span>
                  <Link href={pathname} locale="ar" className="hover:text-primary font-medium text-lg">AR</Link>
                </div>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
