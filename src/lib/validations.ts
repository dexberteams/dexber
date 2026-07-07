import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const requirementFormSchema = z.object({
  clientName: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().optional(),
  contactNumber: z.string().min(5, "Contact number is required"),
  whatsappNumber: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  location: z.string().optional(),
  
  websiteLanguage: z.array(z.string()).min(1, "Select at least one language"),
  hasExistingWeb: z.boolean().default(false),
  existingWebUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  websiteType: z.string().min(1, "Website type is required"),
  
  hasLogo: z.boolean().default(false),
  preferredColors: z.string().optional(),
  websiteStyle: z.string().optional(),
  features: z.array(z.string()).min(1, "Select at least one feature"),
  
  hasDomain: z.boolean().default(false),
  domainName: z.string().optional(),
  hasHosting: z.boolean().default(false),
  
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  }).optional(),
  
  budget: z.string().optional(),
  expectedDate: z.string().optional(),
  notes: z.string().optional(),
});

export type RequirementFormValues = z.infer<typeof requirementFormSchema>;
