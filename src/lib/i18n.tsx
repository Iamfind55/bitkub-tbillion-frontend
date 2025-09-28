"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "lo" | "th"

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const translations = {
  en: {
    "hero.profit": "Trading profit up to",
    "hero.comission": "Earn commission",
    "hero.deposit_withdraw": "Deposit and Withdraw",
    "hero.transactions": "Total trading volume",
    "hero.total_customer": "Total customers",
    "hero.trade_now": "Trade now",
    "hero.promot_title": "Deposit today get comission:",
    "hero.time_up": "Time up",
    "hero.sending": "Sending...",

    // navbar
    "navbar.login": "Login",
    "navbar.register": "Register",
    "navbar.myaccount": "My account",
    "navbar.change_password": "Change password",
    "navbar.authentication": "Verify",
    "navbar.logout": "Log out",

    // faq
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "How can I create an account on your trading platform?",
    "faq.answer1": "Click the register button at the top right and fill in your information completely in the registration form, such as: full name, email, password, then click register to log in. However, before you can trade, you must verify your identity first. After that, wait about 1 hour for your identity to be confirmed. If your account is not approved, you can contact our administrator to unlock it so you can trade.",
    "faq.q2": "Which cryptocurrencies or assets can I trade on your platform?",
    "faq.answer2": "You can trade a wide variety of cryptocurrencies on our platform, such as:",
    "faq.currency": "Currency",
    "faq.q3": "What fees are associated with trading on your platform?",
    "faq.answer3": "The fees or returns you will receive depend on the time period, and each period offers different profits. For example:",
    "faq.answer3-1": "30 seconds: earn 10% profit. The minimum trade amount is 50 coins.",
    "faq.answer3-2": "60 seconds: earn 15% profit. The minimum trade amount is 5,000 coins.",
    "faq.answer3-3": "90 seconds: earn 20% profit. The minimum trade amount is 15,000 coins.",
    "faq.q4": "How secure are my account and personal information?",
    "faq.answer4": "All data entered on our platform is encrypted both at rest and in transit using industry-standard protocols. This means that even if someone intercepts the data, they will not be able to read it.",
    "faq.q5": "Do you have customer support, and how can I get help?",
    "faq.answer5": "We provide 24-hour customer support, which means you can contact our administrators anytime you need assistance with trading, deposits, or withdrawals. You can reach us through the channels listed below.",

    // footer
    "footer.contact_us": "Contact us",
    "footer.title": "Verify your account and receive a 20 USDT coupon instantly.",
    "footer.description": "Risk Warning: Trading binary options involves a high level of risk and may result in the loss of your entire investment. Therefore, binary options may not be suitable for all investors. You should not invest money that you cannot afford to lose. Before trading binary options, you should carefully consider your investment objectives, level of experience, and risk tolerance. Bitkubnek is not responsible for any losses or damages arising from the use of our services or reliance on the information provided on our website. You should conduct your own research and seek independent financial advice before making any investment decisions.",

    // layout
    "layout.home_page": "Home",
    "layout.trade": "Trade",
    "layout.my_account": "My Account",

    // contact us
    "contact.title": "Get in Touch with Our Trading Experts",
    "contact.description": "Need help with your crypto trading strategy? Our team of experts is here to support you 24/7 with personalized guidance and technical assistance.",
    "contact.email": "Email Support",
    "contact.phone": "Phone Support",

    // my account page:
    "account.my_info":"My infomation",
    "account.bank_account": "Bank Account",
    "account.coin_deposit": "Coin Deposit",
    "account.coin_withdraw": "Coin Withdrawal",
    "account.coin_transactioncoin": "Coin Transactions",
    "account.money_withdraw": "Money Withdrawal",
    "account.listtrade": "Trade List",
    "account.transaction": "Transactions",
    "account.account": "My Account",
    "account.privacy": "Identity Verification"

  },
  lo: {},
  th: {
    // hero
    "hero.profit": "กำไรการค้าสูงถึง",
    "hero.comission": "รับค่าคอมมิชชั่น",
    "hero.deposit_withdraw": "ฝาก และ ถอน",
    "hero.transactions": "ปริมาณการซื้อขายทั้งหมด",
    "hero.total_customer": "ผู้ใช้ทั้งหมดของเรา",
    "hero.trade_now": "เทรดเลย",
    "hero.promot_title": "เติมวันนี้รับค่าคอมมิชชั่น",
    "hero.time_up": "หมดเวลา",
    "hero.sending": "กำลังส่ง...",

    // navbar
    "navbar.login": "เข้าสู่ระบบ",
    "navbar.register": "ลงชื่อเข้าใช้",
    "navbar.myaccount": "บัญชีของฉัน",
    "navbar.change_password": "เปลี่ยนรหัสผ่าน",
    "navbar.authentication": " ยืนยันตัวตน",
    "navbar.logout": "ออกจากระบบ",

    // faq
    "faq.title": "คำถามที่พบบ่อย",
    "faq.q1": "ฉันจะสร้างบัญชีในแพลตฟอร์มการซื้อขายของคุณได้อย่างไร?",
    "faq.answer1": "คลิกที่ปุ่มลงทะเบียนด้านบนขวาและกรอกข้อมูลของคุณให้ครบถ้วนตามแบบฟอร์มในหน้าลงทะเบียนเช่น: ชื่อและนามสกุล, อีเมล, รหัสผ่านจากนั้นคลิกลงทะเบียนก็สามารถเข้าสู่ระบบได้แต่ก่อนที่คุณจะสามารถซื้อขายได้ คุณต้องยืนยันตัวตนของคุณเสียก่อนหลังจากนั้นรอประมาณ 1 ชั่วโมงเพื่อยืนยันตัวตนของคุณหากบัญชีของคุณไม่ได้รับการอนุมัติคุณสามารถติดต่อผู้ดูแลระบบของเราเพื่อปลดล็อคเพื่อให้สามารถซื้อขายได้.",
    "faq.q2": "สกุลเงินดิจิทัลหรือสินทรัพย์ใดที่ฉันสามารถซื้อขายได้บนแพลตฟอร์มของคุณ?",
    "faq.answer2": "2.คุณสามารถซื้อขายสกุลเงินดิจิทัลได้หลากหลายสกุลเงินบนแพลตฟอร์มของเราเช่น:",
    "faq.currency": "สกุลเงิน",
    "faq.q3": "ค่าธรรมเนียมที่เกี่ยวข้องกับการซื้อขายบนแพลตฟอร์มของคุณคืออะไร?",
    "faq.answer3": "ค่าธรรมเนียมหรือผลตอบแทนที่คุณจะได้รับจะขึ้นอยู่กับระยะเวลาและแต่ละช่วงจะได้รับผลกำไรที่แตกต่างกัน เช่น:",
    "faq.answer3-1": "30 วิเอากำไล10% ขั้นต่ำในการเทรดต้องมี 50 เหรียญ.",
    "faq.answer3-2": "60 วิกำไล15% ในการเทรดต้องมี 5000 เหรียญ.",
    "faq.answer3-3": "90 วิกำไล20% ในการเทรดต้องมี 15000 เหรียญ.",
    "faq.q4": "บัญชีและข้อมูลส่วนบุคคลของฉันความปลอดภัยอย่างไร?",
    "faq.answer4": " ข้อมูลทั้งหมดที่ป้อนบนแพลตฟอร์มของเราได้รับการเข้ารหัสเมื่อไม่ได้ใช้งานและอยู่ระหว่างการส่งผ่านโดยใช้โปรโตคอลมาตรฐานอุตสาหกรรมซึ่งหมายความว่าถึงแม้จะมีคนดักข้อมูลพวกเขาก็จะไม่สามารถอ่านข้อมูลได้.",
    "faq.q5": "คุณมีบริการสนับสนุนลูกค้าหรือไม่ และฉันจะติดต่อขอความช่วยเหลือได้อย่างไร?",
    "faq.answer5": "เรามีบริการลูกค้าตลอด 24 ชั่วโมงซึ่งหมายความว่าคุณสามารถติดต่อผู้ดูแลระบบของเราได้ตลอดเวลาที่คุณต้องการหรือมีปัญหาในการซื้อขายหรือการฝาก- ถอนเงินและคุณสามารถติดต่อเราผ่านช่องทางด้านล่าง",

    // footer
    "footer.contact_us": "ติดต่อพวกเรา",
    "footer.title": "ยืนยันบัญชีของคุณ และ รับคูปองมูลค่า 20 USDT ทันที.",
    "footer.description": "คำเตือนความเสี่ยง: การซื้อขายไบนารี่ออฟชั่นมีความเสี่ยงสูง และ อาจทำให้สูญเสียเงินลงทุนทั้งหมดของคุณ ดังนั้นไบนารี่ออฟชั่นอาจไม่เหมาะสำหรับนักลงทุนทุกคน คุณไม่ควรลงทุนเงินที่คุณไม่สามารถจะสูญเสียได้ ก่อนซื้อขายไบนารี่ออฟชั่น คุณควรพิจารณาวัตถุประสงค์การลงทุน ระดับประสบการณ์ และ ความเสี่ยงที่ยอมรับได้อย่างรอบคอบ.Bitkubnek ไม่รับผิดชอบต่อความสูญเสียหรือความเสียหายใด ๆ ที่เกิดจากการใช้บริการของเราหรือการพึ่งพาข้อมูลที่ให้ไว้บนเว็บไซต์ของเรา คุณควรทำการวิจัยของคุณเอง และ ขอคำแนะนำทางการเงินอิสระก่อนตัดสินใจลงทุน.",

    // layout
    "layout.home_page": "หน้าแรก",
    "layout.trade": "ซื้อขาย",
    "layout.my_account": "บัญชีฉัน",

    //contact us
    "contact.title": "ติดต่อทีมผู้เชี่ยวชาญด้านการเทรดของเรา",
    "contact.description": "ต้องการความช่วยเหลือเกี่ยวกับกลยุทธ์การเทรดคริปโตของคุณหรือไม่? ทีมผู้เชี่ยวชาญของเราพร้อมให้การสนับสนุนตลอด 24 ชั่วโมงทุกวัน พร้อมคำแนะนำส่วนบุคคลและความช่วยเหลือทางเทคนิค",
    "contact.email": "อีเมลซัพพอร์ต",
    "contact.phone": "ซัพพอร์ตทางโทรศัพท์",

    // my account page:
    "account.my_info": "ข้อมูลของฉัน",
    "account.bank_account": "บัญชีธนาคาร",
    "account.coin_deposit": "ฝากเหรียญ",
    "account.coin_withdraw": "ถอนเหรียญ",
    "account.coin_transactioncoin": "ธุรกรรมเหรียญ",
    "account.money_withdraw": "ถอนเงิน",
    "account.listtrade": "รายการซื้อขาย",
    "account.transaction": "ธุรกรรม",
    "account.account": "บัญชีของฉัน",
    "account.privacy": "ยืนยันตัวตน",

    // Bank account
    
  },
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "lo", "th"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
