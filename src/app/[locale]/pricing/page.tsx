"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function PricingPage() {
  const t = useTranslations("Pricing");

  const pricingPlans = [
    {
      nameKey: "portfolio",
      price: "1,500",
      features: ["feature1", "feature2", "feature3", "feature4", "feature5"],
    },
    {
      nameKey: "coffeeShop",
      price: "2,500",
      features: ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"],
      popular: true,
    },
    {
      nameKey: "business",
      price: "3,500",
      features: ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"],
    },
    {
      nameKey: "ecommerce",
      price: "6,000",
      features: ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"],
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingPlans.map((plan) => (
          <Card key={plan.nameKey} className={`relative flex flex-col ${plan.popular ? 'border-brand-blue ring-1 ring-brand-blue' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 start-1/2 -translate-x-1/2">
                {t("mostPopular")}
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="mb-2">{t(`packages.${plan.nameKey}.name`)}</CardTitle>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-muted-foreground/70">{t("currency")}</span>
              </div>
              <p className="text-sm text-muted-foreground/70 mt-2">{t(`packages.${plan.nameKey}.description`)}</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((featureKey, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground/90">
                    <Check className="h-5 w-5 text-brand-blue shrink-0" />
                    <span>{t(`packages.${plan.nameKey}.features.${featureKey}`)}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/get-started?package=${encodeURIComponent(plan.nameKey)}`} className="w-full">
                <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
                  {t("selectPackage")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
