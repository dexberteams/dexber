"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ArrowRight, Code, Layout, Lightbulb, Smartphone, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/20 via-brand-navy to-background -z-10" />
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Building the Future of <br className="hidden md:block" />
            <span className="text-brand-blue">Digital Technology</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10"
          >
            We design and develop reliable, innovative software solutions that help people and organizations communicate better and work smarter.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/get-started">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Our Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white/5 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-muted-foreground/70 max-w-2xl mx-auto">
              From custom software to scalable web platforms, we provide full-cycle development services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:border-brand-blue/50 transition-colors">
              <CardHeader>
                <Code className="h-10 w-10 text-brand-blue mb-4" />
                <CardTitle>Software Development</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground/70">
                Custom software solutions designed specifically for businesses and organizations.
              </CardContent>
            </Card>
            <Card className="hover:border-brand-blue/50 transition-colors">
              <CardHeader>
                <Layout className="h-10 w-10 text-brand-blue mb-4" />
                <CardTitle>Web Solutions</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground/70">
                Modern, scalable, and responsive websites and e-commerce platforms.
              </CardContent>
            </Card>
            <Card className="hover:border-brand-blue/50 transition-colors">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-brand-blue mb-4" />
                <CardTitle>IT Consulting</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground/70">
                Technology guidance, system planning, and digital transformation support.
              </CardContent>
            </Card>
            <Card className="hover:border-brand-blue/50 transition-colors">
              <CardHeader>
                <Smartphone className="h-10 w-10 text-brand-blue mb-4" />
                <CardTitle>Product Development</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground/70">
                Designing and building innovative digital platforms and applications.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Built on Core Values</h2>
              <p className="text-muted-foreground/70 mb-8 text-lg">
                We believe in making complex technology simple and user-friendly, while building secure and dependable digital systems.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-brand-blue/20 p-2 rounded-lg">
                    <Zap className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Innovation</h4>
                    <p className="text-muted-foreground/70">Continuously exploring new technologies and ideas.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-brand-blue/20 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Reliability</h4>
                    <p className="text-muted-foreground/70">Building secure and dependable digital systems.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-border">
              <div className="absolute inset-0 bg-brand-blue/10 flex items-center justify-center">
                <Image
                  src="/images/logos/Dexber_White_PNG-01.png"
                  alt="Dexber Core Values"
                  width={200}
                  height={200}
                  className="opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-blue/10 border-t border-brand-blue/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start your digital journey?</h2>
          <p className="text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
            Fill out our requirement form and we'll get back to you with a custom proposal and timeline.
          </p>
          <Link href="/get-started">
            <Button size="lg">Get a Custom Quote</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
