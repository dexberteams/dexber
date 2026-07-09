import Link from "next/link";
import Image from "next/image";

export function Footer() {
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
              Building the Future of Digital Technology.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground/70">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Connect</h3>
            <ul className="space-y-3 text-sm text-muted-foreground/70">
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground/50">
          <p>© {new Date().getFullYear()} Dexber. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
