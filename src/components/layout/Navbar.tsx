import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-navy/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
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
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="text-brand-gray/80 hover:text-white transition-colors">About</Link>
          <Link href="/services" className="text-brand-gray/80 hover:text-white transition-colors">Services</Link>
          <Link href="/portfolio" className="text-brand-gray/80 hover:text-white transition-colors">Portfolio</Link>
          <Link href="/pricing" className="text-brand-gray/80 hover:text-white transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/get-started">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
