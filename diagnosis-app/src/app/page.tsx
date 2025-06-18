import React from "react";
import Homee from "@/components/Home/homee";
import Aboutus from "@/components/Home/aboutus";
import Efficiency from "@/components/Home/efficiency";
import Introduce from "@/components/Home/introduce";
import Diagnosis from "@/components/Home/diagnosis";

import Perks from "@/components/Home/perks";
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
