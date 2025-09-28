"use client";
import Iconadd from "@/icon/iconadd";
import Icondown from "@/icon/icondown";
import { useTranslation } from "@/lib/i18n";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
function FAQ() {
  const { t } = useTranslation();

  function AccordionItem({
    title,
    children,
  }: {
    title: string;
    children: any;
  }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <h2 id={`accordion-heading-${title}`}>
          <button
            type="button"
            className="flex items-center justify-between text-start w-full py-5 font-medium rtl:text-right text-gray-400 border-b border-gray-200"
            data-accordion-target="#accordion-flush-body-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls={`accordion-body-${title}`}
          >
            <span>{title}</span>
            <div className="bg-white rounded-full text-primary shadow-lg ml-2">
              {isOpen ? <Icondown /> : <ChevronRight size={20} />}
            </div>
          </button>
        </h2>
        <div
          id={`accordion-body-${title}`}
          className={`accordion-content ${isOpen ? "block" : "hidden"} `}
        >
          <div className="text-start py-5 border-b border-gray-500">
            {children}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-md container mx-auto py-5">
      <h1 className="text-xl md:text-3xl text-center">{t("faq.title")}:</h1>
      <div className="px-5">
        <div>
          <AccordionItem title={t("faq.q1")}>
            <p className="text-gray-300">
              {t("faq.answer1")}
            </p>
          </AccordionItem>
          <AccordionItem title={t("faq.q2")}>
            <div className="text-gray-300">
              <div>
                {t("faq.answer2")}
              </div>
              <ul>
                <li>{t("faq.currency")} BTCUSDT</li>
                <li>{t("faq.currency")} BNBUSDT</li>
                <li>{t("faq.currency")} ETHUSDT</li>
                <li>{t("faq.currency")} XRPUSDT</li>
                <li>{t("faq.currency")} USTCUSDT</li>
                <li>{t("faq.currency")}พอร์ทัล USDT</li>
                <li>{t("faq.currency")} AVAXUSDT</li>
                <li>{t("faq.currency")} AIUSDT</li>
                <li>{t("faq.currency")} MATICUSDT</li>
                <li>{t("faq.currency")} PEOPLEUSDT</li>
                <li>{t("faq.currency")} WLDUSDT</li>
                <li>{t("faq.currency")} BONKUSDT</li>
                <li>{t("faq.currency")} ADAUSDT</li>
                <li>{t("faq.currency")} FETUSDT</li>
                <li>{t("faq.currency")} SHIBUSDT</li>
                <li>{t("faq.currency")} SOLUSDT</li>
                <li>{t("faq.currency")} DOGEUSDT</li>
                <li>{t("faq.currency")} DOTUSDT</li>
                <li>{t("faq.currency")} AGLDUSDT</li>
                <li>{t("faq.currency")} PSGUSDG</li>
              </ul>
            </div>
          </AccordionItem>
          <AccordionItem title={t("faq.q3")}>
            <div className="text-gray-300">
              <div>
                {t("faq.answer3")}
              </div>
              <ul>
                <li>{t("faq.answer3-1")}</li>
                <li>{t("faq.answer3-2")}</li>
                <li>{t("faq.answer3-3")}</li>
              </ul>
            </div>
          </AccordionItem>
          <AccordionItem title={t("faq.q4")}>
            <p className="text-gray-300">
              {t("faq.answer4")}
            </p>
          </AccordionItem>

          <AccordionItem title={t("faq.q5")}>
            <p className="text-gray-300">
              {t("faq.answer5")}
            </p>
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
