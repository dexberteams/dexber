"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { requirementFormSchema, type RequirementFormValues } from "@/lib/validations";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";

const STEPS = [
  { id: 1, key: "step1", fields: ["clientName", "companyName", "email", "contactNumber", "whatsappNumber"] },
  { id: 2, key: "step2", fields: ["websiteType", "websiteLanguage", "hasExistingWeb", "existingWebUrl"] },
  { id: 3, key: "step3", fields: ["hasLogo", "preferredColors", "websiteStyle"] },
  { id: 4, key: "step4", fields: ["features"] },
  { id: 5, key: "step5", fields: ["hasDomain", "domainName", "hasHosting"] },
  { id: 6, key: "step6", fields: ["budget", "expectedDate", "notes"] },
];

function GetStartedContent() {
  const t = useTranslations("GetStarted");
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.input<typeof requirementFormSchema>>({
    resolver: zodResolver(requirementFormSchema),
    defaultValues: {
      clientName: "",
      companyName: "",
      contactNumber: "",
      whatsappNumber: "",
      email: "",
      websiteType: "",
      websiteLanguage: [],
      hasExistingWeb: false,
      existingWebUrl: "",
      hasLogo: false,
      preferredColors: "",
      websiteStyle: "",
      features: [],
      hasDomain: false,
      domainName: "",
      hasHosting: false,
      budget: "",
      expectedDate: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const { watch, setValue, register, formState: { errors } } = form;

  const hasExistingWeb = watch("hasExistingWeb");
  const hasDomain = watch("hasDomain");
  const selectedFeatures = watch("features") || [];
  const selectedLanguages = watch("websiteLanguage") || [];

  useEffect(() => {
    const pkg = searchParams.get("package");
    if (pkg) {
      setValue("notes", `Selected Package: ${pkg}`);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (values: z.input<typeof requirementFormSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/requirement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to submit");
      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fields = STEPS[step - 1].fields as any;
    const isValid = await form.trigger(fields);
    if (isValid) {
      setStep((s) => Math.min(s + 1, 6));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo(0, 0);
  };

  const toggleFeature = (featureKey: string) => {
    if (selectedFeatures.includes(featureKey)) {
      setValue("features", selectedFeatures.filter((f: string) => f !== featureKey), { shouldValidate: true });
    } else {
      setValue("features", [...selectedFeatures, featureKey], { shouldValidate: true });
    }
  };

  const toggleLanguage = (langKey: string) => {
    if (selectedLanguages.includes(langKey)) {
      setValue("websiteLanguage", selectedLanguages.filter((l: string) => l !== langKey), { shouldValidate: true });
    } else {
      setValue("websiteLanguage", [...selectedLanguages, langKey], { shouldValidate: true });
    }
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("title")}</h1>
        <p className="text-muted-foreground/80">{t("subtitle")}</p>
      </div>

      {isSuccess ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="border-brand-blue/50 bg-brand-blue/10 text-center py-16">
            <CardContent>
              <div className="h-20 w-20 bg-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-brand-blue" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{t("successTitle")}</h2>
              <p className="text-muted-foreground/80 max-w-md mx-auto">{t("successDesc")}</p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border/50 pb-6 mb-6 bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <CardTitle>{t(STEPS[step - 1].key as any)}</CardTitle>
              <span className="text-sm text-brand-blue font-medium">
                {step} / 6
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div 
                className="bg-brand-blue h-2 rounded-full"
                initial={{ width: `${((step - 1) / 6) * 100}%` }}
                animate={{ width: `${(step / 6) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">{t("fields.clientName")}</label>
                          <Input {...register("clientName")} placeholder={t("placeholders.clientName")} />
                          {errors.clientName && <p className="text-red-400 text-sm">{errors.clientName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">{t("fields.companyName")}</label>
                          <Input {...register("companyName")} placeholder={t("placeholders.companyName")} />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">{t("fields.email")}</label>
                          <Input type="email" {...register("email")} placeholder={t("placeholders.email")} />
                          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">{t("fields.contactNumber")}</label>
                          <Input {...register("contactNumber")} placeholder={t("placeholders.contactNumber")} dir="ltr" className="text-start" />
                          {errors.contactNumber && <p className="text-red-400 text-sm">{errors.contactNumber.message}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">{t("fields.whatsappNumber")}</label>
                        <Input {...register("whatsappNumber")} placeholder={t("placeholders.whatsappNumber")} dir="ltr" className="text-start" />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">{t("fields.websiteType")}</label>
                        <select 
                          {...register("websiteType")}
                          className="flex h-10 w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                        >
                          <option value="">--</option>
                          <option value="portfolio">{t("options.websiteType.portfolio")}</option>
                          <option value="coffeeShop">{t("options.websiteType.coffeeShop")}</option>
                          <option value="business">{t("options.websiteType.business")}</option>
                          <option value="ecommerce">{t("options.websiteType.ecommerce")}</option>
                          <option value="custom">{t("options.websiteType.custom")}</option>
                        </select>
                        {errors.websiteType && <p className="text-red-400 text-sm">{errors.websiteType.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">{t("fields.websiteLanguage")}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {["en", "ar", "multi"].map((lang) => (
                            <button
                              key={lang}
                              type="button"
                              onClick={() => toggleLanguage(lang)}
                              className={`p-3 rounded-md border text-sm text-start transition-colors ${
                                selectedLanguages.includes(lang) 
                                  ? "bg-brand-blue/10 border-brand-blue text-brand-blue" 
                                  : "bg-muted border-border text-muted-foreground hover:border-brand-blue/50"
                              }`}
                            >
                              {t(`options.websiteLanguage.${lang}` as any)}
                            </button>
                          ))}
                        </div>
                        {errors.websiteLanguage && <p className="text-red-400 text-sm">{errors.websiteLanguage.message}</p>}
                      </div>

                      <div className="space-y-2 pt-4 border-t border-border/50">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" {...register("hasExistingWeb")} className="w-5 h-5 rounded border-border bg-muted text-brand-blue focus:ring-brand-blue" />
                          <span className="text-sm font-medium text-white">{t("fields.hasExistingWeb")}</span>
                        </label>
                      </div>

                      {hasExistingWeb && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">{t("fields.existingWebUrl")}</label>
                          <Input {...register("existingWebUrl")} placeholder={t("placeholders.existingWebUrl")} dir="ltr" className="text-start" />
                          {errors.existingWebUrl && <p className="text-red-400 text-sm">{errors.existingWebUrl.message}</p>}
                        </div>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" {...register("hasLogo")} className="w-5 h-5 rounded border-border bg-muted text-brand-blue focus:ring-brand-blue" />
                          <span className="text-sm font-medium text-white">{t("fields.hasLogo")}</span>
                        </label>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">{t("fields.preferredColors")}</label>
                        <Input {...register("preferredColors")} placeholder={t("placeholders.preferredColors")} />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">{t("fields.websiteStyle")}</label>
                        <Input {...register("websiteStyle")} placeholder={t("placeholders.websiteStyle")} />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-white mb-2 block">{t("fields.features")}</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {["contactForm", "gallery", "blog", "ecommerce", "booking", "multilingual", "auth"].map((feat) => (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => toggleFeature(feat)}
                            className={`p-4 rounded-md border text-sm text-start flex items-center justify-between transition-colors ${
                              selectedFeatures.includes(feat) 
                                ? "bg-brand-blue/10 border-brand-blue text-brand-blue" 
                                : "bg-muted border-border text-muted-foreground hover:border-brand-blue/50"
                            }`}
                          >
                            {t(`options.features.${feat}` as any)}
                            {selectedFeatures.includes(feat) && <Check className="w-4 h-4 text-brand-blue" />}
                          </button>
                        ))}
                      </div>
                      {errors.features && <p className="text-red-400 text-sm">{errors.features.message}</p>}
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" {...register("hasDomain")} className="w-5 h-5 rounded border-border bg-muted text-brand-blue focus:ring-brand-blue" />
                          <span className="text-sm font-medium text-white">{t("fields.hasDomain")}</span>
                        </label>
                      </div>
                      
                      {hasDomain && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">{t("fields.domainName")}</label>
                          <Input {...register("domainName")} placeholder={t("placeholders.domainName")} dir="ltr" className="text-start" />
                        </div>
                      )}

                      <div className="space-y-2 pt-4 border-t border-border/50">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" {...register("hasHosting")} className="w-5 h-5 rounded border-border bg-muted text-brand-blue focus:ring-brand-blue" />
                          <span className="text-sm font-medium text-white">{t("fields.hasHosting")}</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">{t("fields.budget")}</label>
                          <Input {...register("budget")} placeholder={t("placeholders.budget")} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white">{t("fields.expectedDate")}</label>
                          <Input {...register("expectedDate")} placeholder={t("placeholders.expectedDate")} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">{t("fields.notes")}</label>
                        <textarea
                          {...register("notes")}
                          placeholder={t("placeholders.notes")}
                          className="flex min-h-[120px] w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                        />
                      </div>
                    </div>
                  )}
                </form>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                  {t("prev")}
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 6 ? (
                <Button type="button" onClick={nextStep} className="min-w-[120px]">
                  {t("next")}
                </Button>
              ) : (
                <Button 
                  type="button" 
                  onClick={form.handleSubmit(onSubmit)} 
                  className="min-w-[150px]" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("submitting") : t("submit")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 overflow-hidden">
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
        <GetStartedContent />
      </Suspense>
    </div>
  );
}
