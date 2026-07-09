"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border bg-brand-navy py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logos/Dexber_White_PNG-02.png"
                alt="Dexber Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-white">Dexber</span>
            </Link>
            <p className="text-sm text-muted-foreground/70">
              {t("tagline")}
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">{t("company")}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground/70">
              <li><Link href="/about" className="hover:text-white transition-colors">{t("aboutUs")}</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">{t("services")}</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">{t("portfolio")}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t("contact")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">{t("legal")}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground/70">
              <li><Link href="/privacy" className="hover:text-white transition-colors">{t("privacy")}</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">{t("terms")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">{t("connect")}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground/70">
              <li><a href="#" className="hover:text-white transition-colors">{t("whatsapp")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("linkedin")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("instagram")}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground/50">
          <p>© {new Date().getFullYear()} Dexber. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
