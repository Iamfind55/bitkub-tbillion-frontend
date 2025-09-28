import React from "react";
import Tablewithdraw from "./tablewithdraw";
import Maincontent from "@/utils/maincontent";
import Tabwithdraw from "./tabwithdraw";

export default function layout({ children }:any) {
  return (
    <Maincontent>       
      <h6 className="px-1 py-1 text-gray-800 font-bold">Manage Withdraw</h6>
      <Tabwithdraw/>  
      {children}
    </Maincontent>
  );
}
