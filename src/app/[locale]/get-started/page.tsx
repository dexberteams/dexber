"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const formSchema = z.object({
  clientName: z.string().min(2, "Name is required"),
  companyName: z.string().optional(),
  contactNumber: z.string().min(5, "Contact number is required"),
  whatsappNumber: z.string().optional(),
  email: z.string().email("Invalid email address"),
  websiteType: z.string().min(1, "Please select a website type"),
  websiteLanguage: z.string().min(1, "Please select language preference"),
});

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      companyName: "",
      contactNumber: "",
      whatsappNumber: "",
      email: "",
      websiteType: "",
      websiteLanguage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Project Requirement Form</h1>
          <p className="text-muted-foreground/80">
            Tell us about your project and we'll get back to you with a detailed proposal.
          </p>
        </div>

        {isSuccess ? (
          <Card className="border-green-500/50 bg-green-500/10 text-center py-12">
            <CardContent>
              <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Request Received!</h2>
              <p className="text-muted-foreground/80">
                Thank you for choosing Dexber. Our team will review your requirements and contact you within 24 hours.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Full Name *</label>
                    <Input {...form.register("clientName")} placeholder="John Doe" />
                    {form.formState.errors.clientName && (
                      <p className="text-red-400 text-sm">{form.formState.errors.clientName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Company Name</label>
                    <Input {...form.register("companyName")} placeholder="Acme Inc." />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Email Address *</label>
                    <Input type="email" {...form.register("email")} placeholder="john@example.com" />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Contact Number *</label>
                    <Input {...form.register("contactNumber")} placeholder="+966 5X XXX XXXX" />
                    {form.formState.errors.contactNumber && (
                      <p className="text-red-400 text-sm">{form.formState.errors.contactNumber.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Website Type *</label>
                  <select 
                    {...form.register("websiteType")}
                    className="flex h-10 w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <option value="">Select a type...</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="coffee-shop">Coffee Shop / Restaurant</option>
                    <option value="business">Business / Corporate</option>
                    <option value="ecommerce">E-commerce</option>
                  </select>
                  {form.formState.errors.websiteType && (
                    <p className="text-red-400 text-sm">{form.formState.errors.websiteType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Primary Language *</label>
                  <select 
                    {...form.register("websiteLanguage")}
                    className="flex h-10 w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <option value="">Select a language...</option>
                    <option value="en">English</option>
                    <option value="ar">Arabic (RTL)</option>
                    <option value="multi">Multilingual (EN + AR)</option>
                  </select>
                  {form.formState.errors.websiteLanguage && (
                    <p className="text-red-400 text-sm">{form.formState.errors.websiteLanguage.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Requirements"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
