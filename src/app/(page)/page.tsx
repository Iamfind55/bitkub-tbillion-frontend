import Link from "next/link";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Ouruser from "./ouruser";
import Listtrade from "./trade/[name]/listtrade";
import TimeCountdownPromotion from "./TimeCountdownPromotion";
import Bannerslide from "./trade/bannerslide";

type typetrade = {
  assetCode: string;
  assetName: string;
  logoUrl: string;
  chartLine: string;
  symbol: string;
  circulatingSupply: string;
};
export default async function page() {
  const cardFeatures = [
    {
      name: "กำไรการค้าสูงถึง",
      icon: (
        <img
          src="/images/turn-back.png"
          className="shadow-lg md:w-14 md:h-14 h-10 w-10"
          alt=""
        />
      ),
      value: "90%",
    },
    {
      name: "รับค่าคอมมิชชั่น",
      icon: (
        <img
          src="/images/promotion.png"
          className="shadow-lg md:w-14 md:h-14 h-10 w-10"
          alt=""
        />
      ),
      value: "50%",
    },
    {
      name: "ฝาก และ ถอน",
      icon: (
        <img
          src="/images/cryptobank.png"
          className="shadow-lg md:w-14 md:h-14 h-10 w-10"
          alt=""
        />
      ),
      value: "$100",
    },
    {
      name: "ปริมาณการซื้อขายทั้งหมด",
      icon: (
        <img
          src="/images/money-bag.png"
          className="shadow-lg md:w-14 md:h-14 h-10 w-10"
          alt=""
        />
      ),
      value: "$12,052",
    },
  ];

  return (
    <div className="bg-slate-800">
      <div
        className="min-h-screen w-full bg-cover md:pb-10 pb-5 bg-center "
        style={{
          backgroundImage:
            'linear-gradient(#68686841, #222225f8), url("https://images.pexels.com/photos/8919573/pexels-photo-8919573.jpeg")',
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto">
          <Bannerslide />
        </div>
        <div className="container px-5 pt-0 md:pt-[40px] mx-auto relative select-none">
          <div className="select-none pointer-events-none grid grid-cols-12 w-full -z-0 absolute left-0 top-40 md:visible invisible">
            <div className="col-span-6 flex flex-col items-center">
              <img
                src="/images/logo/bitcoin.png"
                className="w-12 h-12 opacity-50 shadow-slate-800 animate-bounce animation-all duration-200"
              />
              <img
                src="/images/logo/xrp.png"
                className="w-10 h-10 opacity-30 shadow-slate-800 ml-20 animate-bounce animation-all duration-6000"
              />
            </div>
            <div className="col-span-6 flex flex-col items-center">
              <img
                src="/images/logo/bnb.png"
                className="w-10 h-10 opacity-60 shadow-slate-800  animate-bounce animation-all duration-500"
              />
              <img
                src="/images/logo/eth.png"
                className="w-12 h-12 ml-20 opacity-20 shadow-slate-800 animate-bounce animation-all duration-900"
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-12 md:gap-10 gap-5">
            <div className="col-span-12 text-center z-20 pt-5">
              <h3 className="text-warning md:text-5xl text-2xl font-bold">
                <Ouruser />
              </h3>
              <h1 className="md:pt-5 pt-1 md:text-5xl text-2xl font-bold text-white">
                ผู้ใช้ทั้งหมดของเรา
              </h1>
              <div className="mt-5 md:mt-8">
                <Link
                  href="/trade/BTCUSDT"
                  className="hover:text-white/80 px-6 py-1 md:py-2 bg-warning  rounded-md transition-all duration-200 font-bold text-lg"
                >
                  เทรดเลย
                </Link>
              </div>
            </div>
          </div>

          <div className="container mx-auto md:pt-16 sm:pt-10 pt-8">
            <Listtrade />
          </div>

          <div className="container mx-auto  mt-20 md:mt-25  lg:mt-30">
            <div className="w-full grid grid-cols-12 gap-2">
              {cardFeatures.map((item, index) => (
                <div
                  className="lg:col-span-3 sm:col-span-6 col-span-12 z-20 rounded-md bg-primary/90"
                  key={index}
                >
                  <div className="p-4 flex items-center gap-2">
                    {item.icon}
                    <div className="ml-2">
                      <h5 className="lg:text-lg text-md font-bold tracking-tight text-white dark:text-white">
                        {item.name}
                      </h5>
                      <p className="lg:text-xl text-lg text-warning font-bold">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto flex justify-center md:pt-10 pt-5">
          <TimeCountdownPromotion />
        </div>
      </div>

      <div className="container mx-auto md:pt-10 pt-5 relative z-20">
        <FAQ />
      </div>
      <div className="bg-primary/80 py-5">
        <div className="container mx-auto z-20 md:pt-10 pt-5">
          <Footer />
        </div>
      </div>
    </div>
  );
}
