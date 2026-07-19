"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-xl"
      >
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-tight text-brand-blue">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground">
          Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
