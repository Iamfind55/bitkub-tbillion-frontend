"use client";
import Link from "next/link";
function Footer() {
  const socialList = [
    {
      icon: "/images/icons-line.png",
      title: "@823saamn",
      link: "https://lin.ee/NNcSXO3",
    },
  ];
  return (
    <div className="px-4">
      <div className="w-full md:mt-5 grid grid-cols-6 md:grid-cols-6 gap-2">
        <div className="md:col-span-2 col-span-12 text-gray-300">
          <div className="py-2 logo flex items-center">
            <img src="/new-logo/logo.jpeg" alt="logo" className="h-10 w-10 rounded-sm" />
            <span className="lg:text-2xl text-xl font-bold ml-2 select-none uppercase">
              Tbillions
            </span>
          </div>
          <div className="mt-3">
            <p>Email: tbillion@gmail.com</p>
          </div>
        </div>
        <div className="md:col-span-2 col-span-12 mt-2 text-gray-300">
          <h1 className="text-xl">ติดต่อพวกเรา:</h1>
          {socialList?.map((item, index) => (
            <div key={index} className="mt-3">
              <Link href={item.link} className="flex">
                <img src={item.icon} alt="" className="w-8" />
                <p className="px-2 flex items-center">{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="md:col-span-2 col-span-12 md:mt-2 mt-5 text-gray-300">
          <Link
            href="/trade/BTCUSDT"
            className="lg:text-1xl text-gray-800 py-2 px-4 rounded-md text-xl font-bold bg-yellow-500"
          >
            เทรดเลย
          </Link>
          <p className="mt-5">
            ยืนยันบัญชีของคุณ และ รับคูปองมูลค่า 20 USDT ทันที.
          </p>
        </div>
      </div>
      <div className="border-t border-gray-500 mt-5">
        <p className="py-4 text-gray-300 text-sm">
          คำเตือนความเสี่ยง: การซื้อขายไบนารี่ออฟชั่นมีความเสี่ยงสูง และ
          อาจทำให้สูญเสียเงินลงทุนทั้งหมดของคุณ
          ดังนั้นไบนารี่ออฟชั่นอาจไม่เหมาะสำหรับนักลงทุนทุกคน
          คุณไม่ควรลงทุนเงินที่คุณไม่สามารถจะสูญเสียได้
          ก่อนซื้อขายไบนารี่ออฟชั่น คุณควรพิจารณาวัตถุประสงค์การลงทุน
          ระดับประสบการณ์ และ ความเสี่ยงที่ยอมรับได้อย่างรอบคอบ. Bitkubnek
          ไม่รับผิดชอบต่อความสูญเสียหรือความเสียหายใด ๆ
          ที่เกิดจากการใช้บริการของเราหรือการพึ่งพาข้อมูลที่ให้ไว้บนเว็บไซต์ของเรา
          คุณควรทำการวิจัยของคุณเอง และ
          ขอคำแนะนำทางการเงินอิสระก่อนตัดสินใจลงทุน.
        </p>
      </div>
    </div>
  );
}

export default Footer;
