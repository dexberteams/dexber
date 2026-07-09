"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Target, Lightbulb, Rocket, Shield, Users, Trophy, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export default function AboutPage() {
  const t = useTranslations("About");
  const tHome = useTranslations("HomePage");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground/90">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story, Vision, Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn}>
              <Card className="h-full border-brand-blue/20 bg-brand-navy/5">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-brand-blue/10 rounded-full">
                    <Users className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{t("storyTitle")}</h3>
                  <p className="text-muted-foreground">{t("storyText")}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full border-brand-blue/20 bg-brand-navy/5">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-brand-blue/10 rounded-full">
                    <Target className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{t("visionTitle")}</h3>
                  <p className="text-muted-foreground">{t("visionText")}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full border-brand-blue/20 bg-brand-navy/5">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-brand-blue/10 rounded-full">
                    <Rocket className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{t("missionTitle")}</h3>
                  <p className="text-muted-foreground">{t("missionText")}</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={fadeIn} className="space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-brand-blue">50+</div>
              <div className="text-sm md:text-base font-medium text-muted-foreground">{t("stats.projects")}</div>
            </motion.div>
            <motion.div variants={fadeIn} className="space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-brand-blue">30+</div>
              <div className="text-sm md:text-base font-medium text-muted-foreground">{t("stats.clients")}</div>
            </motion.div>
            <motion.div variants={fadeIn} className="space-y-2 col-span-2 md:col-span-1">
              <div className="text-4xl md:text-5xl font-extrabold text-brand-blue">5+</div>
              <div className="text-sm md:text-base font-medium text-muted-foreground">{t("stats.experience")}</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("valuesTitle")}</h2>
            <p className="text-lg text-muted-foreground">{t("valuesSubtitle")}</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="flex gap-4 p-6 rounded-2xl bg-muted/50">
              <Lightbulb className="w-10 h-10 text-brand-blue shrink-0" />
              <div>
                <h4 className="text-xl font-bold mb-2">{tHome("value1Title")}</h4>
                <p className="text-muted-foreground">{tHome("value1Desc")}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex gap-4 p-6 rounded-2xl bg-muted/50">
              <Shield className="w-10 h-10 text-brand-blue shrink-0" />
              <div>
                <h4 className="text-xl font-bold mb-2">{tHome("value2Title")}</h4>
                <p className="text-muted-foreground">{tHome("value2Desc")}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Teaser (Citthe) */}
      <section className="py-24 bg-brand-navy text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-2xl mx-auto space-y-8"
          >
            <div className="inline-block p-4 bg-brand-blue/20 rounded-full mb-4">
              <Code className="w-12 h-12 text-brand-blue" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {t("cittheTitle")}
            </h2>
            <p className="text-xl text-muted-foreground/80">
              {t("cittheDesc")}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
