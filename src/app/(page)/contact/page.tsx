"use client"

import { useTranslation } from "@/lib/i18n";
import { CiMail, CiPhone } from "react-icons/ci";

export default function page() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="container px-8 sm:px-16 mx-auto pt-[120px] select-none">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 text-balance">{t("contact.title")}</h2>
            <p className="text-md text-muted-foreground leading-relaxed">
              {t("contact.description")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="w-full p-4 bg-card border border-yellow-500 rounded-md">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-lg border border-orange-300">
                  <CiMail className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-md font-semibold text-card-foreground mb-1">{t("contact.email")}</h3>
                  <a
                    href="mailto:support@cryptotradepro.com"
                    className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    tbillion@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full p-4 bg-card border border-yellow-500 rounded-md">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-lg border border-orange-300">
                  <CiPhone className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-md font-semibold text-card-foreground mb-1">{t("contact.phone")}</h3>
                  <a href="tel:+1-800-CRYPTO-1" className="text-sm text-accent hover:text-accent/80 transition-colors font-medium">
                    +856 20 93046151
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
