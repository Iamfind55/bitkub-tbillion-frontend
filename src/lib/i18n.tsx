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
    "contact.line": "Line Support",


    // my account page:
    "account.my_info": "My infomation",
    "account.bank_account": "Bank Account",
    "account.coin_deposit": "Coin Deposit",
    "account.coin_withdraw": "Coin Withdrawal",
    "account.coin_transactioncoin": "Coin Transactions",
    "account.money_withdraw": "Money Withdrawal",
    "account.listtrade": "Trade List",
    "account.transaction": "Transactions",
    "account.account": "My Account",
    "account.privacy": "Identity Verification",

    //login
    "login.title": "Login",
    "login.email": "Phone/Email",
    "login.password": "Password",
    "login.forgot": "Forgot password",
    "login.signup": "Register",
    "register.title": "Create an account",
    "register.exist": "Already register",

    "alert.login200": "Login success",
    "alert.upload200": "Upload success",
    "alert.signup200": "Register success",
    "alert.message500": "Interal server error",
    "alert.resetPassword": "Reset password successfull",
    "alert.notFoundEmail": "User or email not found",
    "alert.upldateProfile200": "Change password successful",

    "forgot.title":"Forgot password",


    "trade.timerequired": "Please select time",
    "trade.timeUpDown": "Plase select up or down!",
    "trade.amount": "Please enter amount",
    "trade.enougthAmount": "Yout balance not enougth",
    "trade.minAmount": "Your amount min",

    "label.name": "Name",
    "label.phone": "Phone",
    "label.password": "Password",
    "label.email": "Email",
    "label.address": "Address",
    "label.amount": "Amount",

    "label.second": "Second",
    "label.minute": "Minute",
    "label.hour": "Hours",
    "label.day": "day",
    "label.week": "Week",
    "label.db": "Birdth day",
    "label.status": "Status",
    "label.olderPassword": "Current password",
    "label.newPassword": "New password",
    "label.confirmPassword": "Confirm password",

    "placeholder.newPassword": "Enter new password",
    "placeholder.confirm": "Enter confirm password",
    "placeholder.olderPassword": "Enter current password",

    "label.reset": "Reset",
    "button.down": "Down",
    "button.up": "Up",
    "button.sumbit": "Submit",
    "button.uplpoadNow": "Upload now",
    "button.savechange":"Save change",




    // verification
    "hero.verification": "Verification",

    "hero.verification_title": "Audited process",
    "hero.info": "Personal infomation",
    "hero.address": "Name, email, gender, address, etc.",
    "here.account": "Account information",
    "here.passs": "Passport, ID card",
    "hero.check": "Examine",
    "hero.history": "All historical data",
    "hero.verify": "Approved",
    "hero.complete": "Identity verification complete",
    "hero.checkDay": "User identity verification takes 1-3 business days.",
    "hero.step": "How to verify your identity (please read): Take a photo of your ID card or driver's license with your name clearly visible. If it is not clear, we will ask you to verify your identity again.",
    "hero.user": "Username",
    "hero.front": "Attach a photo of the front of your ID card.",
    "hero.imageVerify": "Upload a photo of your passport or ID card.",
    "hero.image": "Select image",
    "hero.back": "Attach a photo of the back of your ID card.",

    // my account
    "hero.male": "Male",
    "hero.female": "Female",
    "hero.other": "Other",

    "hero.transationTitle": "Transaction",
    "hero.amount": "Amount",
    "hero.notData": "No data",

    "hero.trandTitle": "Trade List",
    "hero.trade200": "Transfer success",
    "hero.move200": "Transfer",
    "hero.all": "All",
    "hero.percent": "Percent",
    "hero.type": "Type",
    "hero.trade": "Trade",

    // Bank account
    "bank.manage": "Manage Banks",
    "bank.create": "Add New Bank",
    "bank.create_title": "Create Bank Information",
    "bank.update_title": "Update Bank Information",
    "bank.bank_name": "Bank Name",
    "bank.bank_name_placeholder": "Enter bank name",
    "bank.bank_account_name": "Account Name",
    "bank.bank_account_name_placeholder": "Enter account name",
    "bank.bank_account_number": "Account Number",
    "bank.bank_account_number_placeholder": "Enter account number",

    // Coin deposit:
    "deposit.title": "Coin Account",
    "deposit.network": "Network",
    "deposit.address": "Account Address",
    "deposit.coin_type": "Coin Type",
    "deposit.amount": "Deposit Amount",
    "deposit.upload": "Upload",
    "deposit.uploading": "Uploading...",
    "deposit.confirm": "Confirm",
    "deposit.select": "Select",

    // Coin deposit:
    "coin_deposit.tittle": "Coin Wallet",
    "coin_deposit.warning1": "Please select a wallet first",
    "coin_deposit.warning2": "Please enter the coin amount",
    "coin_deposit.warning3": "Insufficient coins",
    "coin_deposit.success": "Coin withdrawal created successfully",
    "coin_deposit.failed": "Coin withdrawal failed",
    "coin_deposit.failed1": "An error occurred during coin withdrawal",

    "coin_deposit.coin_type": "Coin Type",
    "coin_deposit.coin_type_placeholder": "Coin type...",
    "coin_deposit.amount": "Amount",
    "coin_deposit.amount_placeholder": "Amount...",

    // coin transaction:
    "coin_transaction_title": "Coin Transactions",
    "list_coin_name": "Name",
    "list_coin_name_placeholder": "Name...",
    "list_coin_amount": "Coin Amount",
    "list_coin_amount_placeholder": "Coin Amount...",
    "list_coin_no_data": "No Data",
    "list_coin_when": "When",
    "list_coin_reject": "Rejected",
    "list_coin_pending": "Pending",
    "list_coin_completed": "Completed",

    // withdraw:
    "withdraw.title": "Withdrawal List",
    "withdraw.success": "Withdrawal Successful!",
    "wirthdraw": "Withdraw",
    "withdraw_amount": "Amount",
    "withdraw_amount_placeholder": "Amount...",

    // global
    "close.button": "Close",
    "save.button": "Save",
    "withdraw.button": "Withdraw",
    "confirm.button": "Confirm"
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
    "contact.line": "ซัพพอร์ตทางสาย",

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
    "bank.manage": "จัดการธนาคาร",
    "bank.create": "เพิ่มธนาคารใหม่",
    "bank.create_title": "สร้างข้อมูลธนาคาร",
    "bank.update_title": "อัปเดตข้อมูลธนาคาร",
    "bank.bank_name": "ชื่อธนาคาร",
    "bank.bank_name_placeholder": "กรอกชื่อธนาคาร",
    "bank.bank_account_name": "ชื่อบัญชี",
    "bank.bank_account_name_placeholder": "กรอกชื่อบัญชี",
    "bank.bank_account_number": "เลขบัญชี",
    "bank.bank_account_number_placeholder": "กรอกเลขบัญชี",

    // Coin deposit:
    "deposit.title": "บัญชีของเหรียญ",
    "deposit.network": "เครือ",
    "deposit.address": "ที่อยู่บัญชี",
    "deposit.coin_type": "ประเภทเหรียญ",
    "deposit.amount": "จำนวนเหรียญฝาก",
    "deposit.upload": "อัพโหลด",
    "deposit.uploading": "กำลังโหลด...",
    "deposit.confirm": "ยืนยัน",
     "deposit.select": "เลือกประเภทเลียน",

    // Coin deposit:
    "coin_deposit.tittle": "กระเป๋าเหรียญ",
    "coin_deposit.warning1": "กรุณาเลือกกระเป๋าก่อน",
    "coin_deposit.warning2": "กรุณาระบุจำนวนเหรียญ",
    "coin_deposit.warning3": "เหรียญของคุณไม่เพียงพอ",
    "coin_deposit.success": "สร้างกานถอนเหรียญสำเร็จ",
    "coin_deposit.failed": "การถอนเหรียญล้มเหลว",
    "coin_deposit.failed1": "เกิดข้อผิดพลาดในการถอนเหรียญ",

    "coin_deposit.coin_type": "ประเภทเหรียญ",
    "coin_deposit.coin_type_placeholder": "ประเภทเหรียญ...",
    "coin_deposit.amount": "จำนวนเหรียญ",
    "coin_deposit.amount_placeholder": "จำนวนเหรียญ....",

    // coin transaction and list coin:
    "coin_transaction_title": "ประวัธุรกรรมเหรียญ",
    "list_coin_name": "ชื่อ",
    "list_coin_name_placeholder": "ชื่อ...",
    "list_coin_amount": "จำนวนเหรียญ",
    "list_coin_amount_placeholder": "จำนวนเหรียญ...",
    "list_coin_no_data": "ไม่มีข้อมูล",
    "list_coin_when": "เมื่อ",
    "list_coin_reject": "ปฏิเสธ",
    "list_coin_pending": "รอดำเนินการ",
    "list_coin_completed": "สำเร็จ",

    // withdraw:
    "withdraw.title": "รายการ ถอนเงิน",
    "withdraw.success": "ถอนเงินสำเร็จ!",
    "wirthdraw": "ถอนเงิน",
    "withdraw_amount": "จำนวนเงิน",
    "withdraw_amount_placeholder": "จำนวนเงิน...",

    // global
    "close.button": "ปิด",
    "save.button": "บันทึก",
    "withdraw.button": "ถอน",
    "confirm.button": "ยืนยัน",

    // auth
    "login.title": "เข้าสู่ระบบ",
    "login.email": "โทรศัพท์/อีเมล",
    "login.password": "รหัสผ่าน",
    "login.forgot": "ลืมรหัสผ่าน",
    "login.signup": "ลงทะเบียนเลย",
    "register.title": "ลงชื่อเข้าใช้บัญชีของคุณ",
    "forgot.title":"เปลี่ยนรหัสผ่าน",



    "alert.login200": "เข้าสู่ระบบสำเร็จ",
    "alert.upload200": "อัปเดตความสำร็จ",
    "alert.upldateProfile200": "เปลี่ยนโปรไฟล์สำเร็จ",

    "register.signup200": "ลงทะเบียนสำเร็จ",
    "alert.exist": "อีเมล์ที่ลงทะเบียนไว้แล้ว",
    "alert.message500": "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน",
    "alert.resetPassword": "รีเซ็ตรหัสผ่านสำเร็จ ตรวจสอบรหัสผ่านใหม่ที่ส่งไปยังอีเมล",
    "alert.notFoundEmail": "รีเซ็ตรหัสผ่านสำเร็จ ตรวจสอบรหัสผ่านใหม่ที่ส่งไปยังอีเมล",


    "trade.timerequired": "โปรดเลือกระยะเวลา",
    "trade.timeUpDown": "กรุณาเลือก ขึ้น หรือ ลง!",
    "trade.amount": "กรุณาระบุจำนวนเงิน",
    "trade.enougthAmount": "ยอดเงินไม่เพียงพอ",
    "trade.minAmount": "จำนวนเงินขั้นต่ำ",

    "label.name": "ชื่อ",
    "label.phone": "หมายเลขโทรศัพท์",
    "label.password": "รหัสผ่าน",
    "label.email": "อีเมล",
    "label.address": "ที่อยู่",
    "label.second": "วินาที",
    "label.minute": "นาที",
    "label.hour": "ชั่วโมง",
    "label.day": "วัน",
    "label.week": "อาทิตย์",
    "label.db": "วันเกิด",
    "label.status": "สถานะ",
    "label.olderPassword": "รหัสผ่านเก่า",
    "label.newPassword": "รหัสผ่านใหม่",
    "label.confirmPassword": "ยืนยันรหัสผ่าน",

    "placeholder.newPassword": "ป้อนรหัสผ่านใหม่",
    "placeholder.confirm": "ป้อนยืนยันรหัสผ่าน",
    "placeholder.olderPassword": "ป้อนรหัสผ่านเก่า",



    "label.reset": "รีเซ็ต",
    "button.down": "ลง",
    "button.up": "ขึ้น",
    "button.sumbit": "ส่ง",
    "button.uplpoadNow": "อัปโหลดตอนนี้",
    "button.savechange":"บันทึกการเปลี่ยนแปลง",

    // verification
    "hero.verification": "การยืนยันตัวตน",
    "hero.verification_title": "กระบวนการที่ผ่านการตรวจสอบ",
    "hero.info": "ข้อมูลส่วนตัว",
    "hero.address": "ชื่อ อีเมล เพศ ที่อยู่ และอื่นๆ",
    "here.account": "ข้อมูลบัญชี",
    "here.passs": "หนังสือเดินทาง,บัตรประจำตัวประชาชน",
    "hero.check": "ตรวจสอบ",
    "hero.history": "ประวัติข้อมูลทั้งหมด",
    "hero.verify": "ได้รับการอนุมัติ",
    "hero.complete": "ยืนยันตัวตนเสร็จสมบูรณ์",
    "hero.checkDay": "การยืนยันตัวตนของผู้ใช้งานจะใช่เวลา 1 - 3 วันทำการ",
    "hero.step": "วิธียืนยันตัวตน (โปรดอ่าน) ถ่ายรูปบัตรประชาชน หรือ ใบขับขี่โดยเห็นชื่อให้ชัด ถ้าไม่ชัดทางเราจะให้คุณยืนยันตัวตนใหม่",
    "hero.user": "ชื่อผู้ใช้",
    "hero.front": "แนบรูปภาพหน้าบัตรประชาชน",
    "hero.imageVerify": "อัปโหลดรูปภาพหน้าหนังสือเดินทางหรือบัตรประจำตัวประชาชน",
    "hero.image": "เลือกภาพ",
    "hero.back": "แนบรูปภาพหลังบัตรประชาชน",

    // my account
    "hero.male": "ชาย",
    "hero.female": "หญิง",
    "hero.other": "อื่นๆ",

    // transaction
    "hero.transationTitle": "การทำธุรกรรม",
    "hero.amount": "จำนวน",
    "hero.notData": "ไม่มีข้อมูล",
    "hero.trandTitle": "รายการการค้า",
    "hero.trade200": "โอนสำเร็จ",
    "hero.move200": "โอนย้าย",
    "hero.all": "ทั้งหมด",
    "hero.percent": "เปอร์เซ็นต์",
    "hero.type": "หมวดหมู่",
    "hero.trade": "ซื้อขาย",
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
