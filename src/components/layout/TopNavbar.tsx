"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, usePathname } from "@/i18n/routing";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export function TopNavbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const t = useTranslations("TopNavbar");

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
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-[60] w-full border-b border-border bg-background/95 backdrop-blur-md text-foreground text-sm"
    >
      <div className="container mx-auto flex h-10 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href={pathname} locale="en" className="hover:text-primary">EN</Link>
          <span className="text-muted-foreground/30">|</span>
          <Link href={pathname} locale="ar" className="hover:text-primary">AR</Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs">{t("hi")} {session.user.email || t("user")}</span>
              {session.user.role === 'admin' && (
                <Link href="/admin/dashboard" className="text-xs hover:text-primary underline">{t("dashboard")}</Link>
              )}
              <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent" onClick={() => signOut()}>
                {t("logout")}
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/signin">
                <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">{t("signIn")}</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="h-7 text-xs">{t("register")}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
