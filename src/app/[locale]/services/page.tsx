"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Code2, Globe, Lightbulb, Package, Smartphone, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ServicesPage() {
  const t = useTranslations("Services");
  const tHome = useTranslations("HomePage");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const services = [
    {
      icon: Code2,
      title: tHome("service1Title"),
      desc: tHome("service1Desc"),
    },
    {
      icon: Globe,
      title: tHome("service2Title"),
      desc: tHome("service2Desc"),
    },
    {
      icon: Lightbulb,
      title: tHome("service3Title"),
      desc: tHome("service3Desc"),
    },
    {
      icon: Package,
      title: tHome("service4Title"),
      desc: tHome("service4Desc"),
    },
    {
      icon: Smartphone,
      title: t("mobileAppTitle"),
      desc: t("mobileAppDesc"),
    },
    {
      icon: Palette,
      title: t("uiuxTitle"),
      desc: t("uiuxDesc"),
    }
  ];

  const processSteps = [
    { num: "01", title: t("step1Title"), desc: t("step1Desc") },
    { num: "02", title: t("step2Title"), desc: t("step2Desc") },
    { num: "03", title: t("step3Title"), desc: t("step3Desc") },
    { num: "04", title: t("step4Title"), desc: t("step4Desc") },
  ];

  const technologies = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "Framer Motion"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        <div className="container relative mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground/90">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="h-full border-border hover:border-brand-blue/50 transition-colors duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-brand-blue" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("processTitle")}</h2>
            <p className="text-lg text-muted-foreground">{t("processSubtitle")}</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          >
            {processSteps.map((step, index) => (
              <motion.div key={index} variants={fadeIn} className="relative z-10 space-y-4">
                <div className="text-5xl font-extrabold text-brand-blue/20">{step.num}</div>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("techTitle")}</h2>
            <p className="text-lg text-muted-foreground">{t("techSubtitle")}</p>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          >
            {technologies.map((tech, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="px-6 py-3 rounded-full bg-muted/50 border border-border text-foreground font-medium flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-navy text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {t("ctaTitle")}
            </h2>
            <p className="text-xl text-muted-foreground/80">
              {t("ctaSubtitle")}
            </p>
            <Link href="/get-started" className="inline-block">
              <Button size="lg" className="w-full sm:w-auto flex items-center justify-center text-lg h-14 px-8">
                {t("ctaButton")}
                <ArrowRight className="ms-2 h-5 w-5 rtl:rotate-180" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
