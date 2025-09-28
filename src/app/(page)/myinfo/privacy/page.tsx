"use client"
import Maincontent from '@/utils/maincontent'
import React from 'react'
import MainPrivacy from './main'
import { useTranslation } from '@/lib/i18n';

export default function page() {
  const { t } = useTranslation()
  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-3xl font-bold text-warning text-center">
        {t("hero.verification")}
      </h2>
      <MainPrivacy />
    </div>
  );
}
