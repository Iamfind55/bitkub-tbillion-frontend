"use client";
import Iconadd from "@/icon/iconadd";
import Icondown from "@/icon/icondown";
import { useState } from "react";
function FAQ() {
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
              {isOpen ? <Icondown /> : <Iconadd />}
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
      <h1 className="text-xl md:text-3xl text-center">คำถามที่พบบ่อย:</h1>
      <div className="px-5">
        <div>
          <AccordionItem title="ฉันจะสร้างบัญชีในแพลตฟอร์มการซื้อขายของคุณได้อย่างไร?">
            <p className="text-gray-300">
              คลิกที่ปุ่มลงทะเบียนด้านบนขวาและกรอกข้อมูลของคุณให้ครบถ้วนตามแบบฟอร์มในหน้าลงทะเบียน
              เช่น: ชื่อและนามสกุล, อีเมล, รหัสผ่าน
              จากนั้นคลิกลงทะเบียนก็สามารถเข้าสู่ระบบได้
              แต่ก่อนที่คุณจะสามารถซื้อขายได้ คุณต้องยืนยันตัวตนของคุณเสียก่อน
              หลังจากนั้นรอประมาณ 1 ชั่วโมงเพื่อยืนยันตัวตนของคุณ
              หากบัญชีของคุณไม่ได้รับการอนุมัติ
              คุณสามารถติดต่อผู้ดูแลระบบของเราเพื่อปลดล็อคเพื่อให้สามารถซื้อขายได้.
            </p>
          </AccordionItem>
          <AccordionItem title="สกุลเงินดิจิทัลหรือสินทรัพย์ใดที่ฉันสามารถซื้อขายได้บนแพลตฟอร์มของคุณ?">
            <div className="text-gray-300">
              <div>
                2.คุณสามารถซื้อขายสกุลเงินดิจิทัลได้หลากหลายสกุลเงินบนแพลตฟอร์มของเราเช่น:
              </div>
              <ul>
                <li>สกุลเงิน BTCUSDT</li>
                <li>สกุลเงิน BNBUSDT</li>
                <li>สกุลเงิน ETHUSDT</li>
                <li>สกุลเงิน XRPUSDT</li>
                <li>สกุลเงิน USTCUSDT</li>
                <li>สกุลเงินพอร์ทัล USDT</li>
                <li>สกุลเงิน AVAXUSDT</li>
                <li>สกุลเงิน AIUSDT</li>
                <li>สกุลเงิน MATICUSDT</li>
                <li>สกุลเงิน PEOPLEUSDT</li>
                <li>สกุลเงิน WLDUSDT</li>
                <li>สกุลเงิน BONKUSDT</li>
                <li>สกุลเงิน ADAUSDT</li>
                <li>สกุลเงิน FETUSDT</li>
                <li>สกุลเงิน SHIBUSDT</li>
                <li>สกุลเงิน SOLUSDT</li>
                <li>สกุลเงิน DOGEUSDT</li>
                <li>สกุลเงิน DOTUSDT</li>
                <li>สกุลเงิน AGLDUSDT</li>
                <li>สกุลเงิน PSGUSDG</li>
              </ul>
            </div>
          </AccordionItem>
          <AccordionItem title="ค่าธรรมเนียมที่เกี่ยวข้องกับการซื้อขายบนแพลตฟอร์มของคุณคืออะไร?">
            <div className="text-gray-300">
              <div>
                ค่าธรรมเนียมหรือผลตอบแทนที่คุณจะได้รับจะขึ้นอยู่กับระยะเวลาและแต่ละช่วงจะได้รับผลกำไรที่แตกต่างกัน
                เช่น:
              </div>
              <ul>
                <li>30 วิเอากำไล10% ขั้นต่ำในการเทรดต้องมี 50 เหรียญ.</li>
                <li>60 วิกำไล15% ในการเทรดต้องมี 5000 เหรียญ.</li>
                <li>90 วิกำไล20% ในการเทรดต้องมี 15000 เหรียญ.</li>
              </ul>
            </div>
          </AccordionItem>
          <AccordionItem title="บัญชีและข้อมูลส่วนบุคคลของฉันความปลอดภัยอย่างไร?">
            <p className="text-gray-300">
              ข้อมูลทั้งหมดที่ป้อนบนแพลตฟอร์มของเราได้รับการเข้ารหัสเมื่อไม่ได้ใช้งานและอยู่ระหว่างการส่งผ่านโดยใช้โปรโตคอลมาตรฐานอุตสาหกรรม
              ซึ่งหมายความว่าถึงแม้จะมีคนดักข้อมูล
              พวกเขาก็จะไม่สามารถอ่านข้อมูลได้.
            </p>
          </AccordionItem>

          <AccordionItem title="คุณมีบริการสนับสนุนลูกค้าหรือไม่ และฉันจะติดต่อขอความช่วยเหลือได้อย่างไร?">
            <p className="text-gray-300">
              เรามีบริการลูกค้าตลอด 24 ชั่วโมง
              ซึ่งหมายความว่าคุณสามารถติดต่อผู้ดูแลระบบของเราได้ตลอดเวลาที่คุณต้องการหรือมีปัญหาในการซื้อขายหรือการฝาก-ถอนเงิน
              และคุณสามารถติดต่อเราผ่านช่องทางด้านล่าง: ไลน์แอด: @823saamn
            </p>
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
