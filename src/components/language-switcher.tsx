"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/lib/i18n"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  // { code: "lo", name: "ລາວ", flag: "🇱🇦" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
] as const

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.name}</span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white rounded-md">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code as any)} className="gap-2 cursor-pointer">
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
