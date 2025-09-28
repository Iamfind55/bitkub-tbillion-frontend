import React from "react";
import FormRegister from "./formregister";

export default function page() {
  return (
    <div
      className="mx-auto bg-slate-400 bg-cover bg-center bg-no-repeat w-full min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgba(34, 34, 34, 0.9),rgba(29, 26, 2, 0.79),rgba(34, 34, 34, 0.69)), url('images/bg-register.jpg')",
      }}
    >
      <div className="w-full min-h-screen flex justify-center items-center">
        <div
          className="bg-primary/80 text-white w-full md:w-[90%] shadow lg:w-[600px] backdrop-blur-sm
"
        >
          <FormRegister />
        </div>
      </div>
    </div>
  );
}
