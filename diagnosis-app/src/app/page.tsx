import React from "react";
import Homee from "@/components/Home/homee";

import Efficiency from "@/components/Home/efficiency";

import Diagnosis from "@/components/Home/diagnosis";


import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ChestXray",
};

export default function Home() {
  return (
    <main>
      <Homee />
      <Efficiency />
      <Diagnosis />
    
   
     
    </main>
  );
}
