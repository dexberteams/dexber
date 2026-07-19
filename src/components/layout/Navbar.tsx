"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { MobileMenu } from "./MobileMenu";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const t = useTranslations("Navigation");
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined) return;
    if (latest > previous && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      animate={{ top: hidden ? 0 : undefined }}
      className={`sticky z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300 ease-in-out ${hidden ? "top-0" : "top-0 md:top-10"}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logos/Dexber_Black_PNG-02.png"
            alt="Dexber Logo"
            width={42}
            height={42}
            className="object-contain dark:hidden"
          />
          <Image
            src="/images/logos/Dexber_White_PNG-02.png"
            alt="Dexber Logo"
            width={32}
            height={32}
            className="object-contain hidden dark:block"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">Dexber</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">{t("about")}</Link>
          <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">{t("services")}</Link>
          <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">{t("portfolio")}</Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">{t("pricing")}</Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Link href="/get-started">
              <Button size="sm">{t("getStarted")}</Button>
            </Link>
          </div>
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
