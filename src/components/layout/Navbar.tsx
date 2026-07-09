import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("Navigation");

  return (
    <header className="sticky top-10 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logos/Dexber_Black_PNG-02.png"
            alt="Dexber Logo"
            width={32}
            height={32}
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
          <Link href="/get-started">
            <Button size="sm">{t("getStarted")}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
