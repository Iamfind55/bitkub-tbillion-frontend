import Link from "next/link";
import Main from "./main";

export default function page() {

  return (
    <div>
      <div className="container px-5 mx-auto pt-[120px] select-none">
        <h2 className="text-xl text-center font-bold">ติดต่อเรา</h2>
        <div className="flex md:flex-row flex-col gap-10 justify-center items-center w-full mt-10">
          <Link
            // href="https://lin.ee/NNcSXO3"
            // href="https://line.me/R/ti/p/@613cvaul"
            href="https://lin.ee/xL7LGcR"
            className="text-center hover:opacity-95"
          >
            <img
              src="/images/latest-line.jpeg"
              className="w-[180px] bg-white p-3 rounded-md shadow-lg"
              alt="latest-line.jpeg"
            />
            <div className="pt-3">ไลน์: @xL7LGcR</div>
          </Link>
        </div>
        <div className="flex md:flex-row flex-col gap-10 justify-center items-center w-full mt-5">
          <Main />
        </div>
      </div>
    </div>
  );
}
