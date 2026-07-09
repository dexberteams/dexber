"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const formSchema = z.object({
    name: z.string().min(2, t("form.validation.nameRequired")),
    email: z.string().email(t("form.validation.emailInvalid")),
    phone: z.string().optional(),
    company: z.string().optional(),
    message: z.string().min(5, t("form.validation.messageRequired")),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

      {/* Contact Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            
            {/* Contact Info Panel */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="lg:col-span-1 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t("info.title")}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-blue/10 rounded-lg shrink-0">
                      <Mail className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("info.email")}</h3>
                      <p className="text-muted-foreground mt-1">hello@dexber.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-blue/10 rounded-lg shrink-0">
                      <Phone className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("info.phone")}</h3>
                      <p className="text-muted-foreground mt-1">+966 50 000 0000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-blue/10 rounded-lg shrink-0">
                      <MapPin className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t("info.address")}</h3>
                      <p className="text-muted-foreground mt-1">{t("info.addressValue")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="lg:col-span-2"
            >
              <Card className="border-border">
                <CardContent className="p-6 md:p-8">
                  {submitStatus === "success" ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16 space-y-4"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{t("form.successTitle")}</h3>
                      <p className="text-muted-foreground">{t("form.successDesc")}</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSubmitStatus("idle")}
                        className="mt-6"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {submitStatus === "error" && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-500">
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{t("form.errorTitle")}</h4>
                            <p className="text-sm opacity-90">{t("form.errorDesc")}</p>
                          </div>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{t("form.name")} *</label>
                          <Input 
                            {...form.register("name")} 
                            placeholder="John Doe" 
                            className={form.formState.errors.name ? "border-red-500" : ""}
                          />
                          {form.formState.errors.name && (
                            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{t("form.email")} *</label>
                          <Input 
                            type="email" 
                            {...form.register("email")} 
                            placeholder="john@example.com" 
                            className={form.formState.errors.email ? "border-red-500" : ""}
                          />
                          {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{t("form.phone")}</label>
                          <Input 
                            {...form.register("phone")} 
                            placeholder="+966 50 000 0000" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{t("form.company")}</label>
                          <Input 
                            {...form.register("company")} 
                            placeholder="Acme Corp" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">{t("form.message")} *</label>
                        <textarea
                          {...form.register("message")}
                          placeholder="How can we help you?"
                          rows={5}
                          className={`flex w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:border-transparent ${form.formState.errors.message ? "border-red-500" : ""}`}
                        />
                        {form.formState.errors.message && (
                          <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
                        )}
                      </div>

                      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? t("form.submitting") : t("form.submit")}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
