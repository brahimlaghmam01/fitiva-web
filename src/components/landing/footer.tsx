"use client";

import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t, dir } = useLanguage();

  const footerLinks = {
    product: [
      { labelKey: "footer.features", href: "#features" },
      { labelKey: "footer.gamification", href: "#gamification" },
      { labelKey: "footer.aiCoach", href: "#ai-coach" },
      { labelKey: "footer.pricing", href: "#" },
    ],
    company: [
      { labelKey: "footer.about", href: "#" },
      { labelKey: "footer.blog", href: "#" },
      { labelKey: "footer.careers", href: "#" },
      { labelKey: "footer.press", href: "#" },
    ],
    support: [
      { labelKey: "footer.helpCenter", href: "#" },
      { labelKey: "footer.contact", href: "#" },
      { labelKey: "footer.privacy", href: "#" },
      { labelKey: "footer.terms", href: "#" },
    ],
    social: [
      { label: "Twitter", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  };

  return (
    <footer className="bg-muted/30 border-t border-border" dir={dir}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold italic">F</span>
              </div>
              <span className="text-xl font-bold text-foreground">Fitiva</span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t("footer.productTitle")}</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t("footer.companyTitle")}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t("footer.supportTitle")}</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4">{t("footer.socialTitle")}</h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fitiva. {t("footer.allRightsReserved")}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.privacyPolicy")}
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.termsOfService")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
