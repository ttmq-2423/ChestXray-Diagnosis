"use client";
import Image from "next/image";
import Link from "next/link";


import { motion } from "framer-motion";

import { getImagePrefix } from "@/utils/utils";

  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.6 },
  };


const Banner = () => {
  return (
    <div className="relative w-full h-72 md:h-96 flex items-end justify-center text-center px-4 text-white pb-8">

        <div className="grid grid-cols-12">
          <motion.div {...leftAnimation} className="lg:col-span-5 col-span-12">
            <div className="flex gap-6 items-center lg:justify-start justify-center mb-0 mt-24">
              <Image
                src= {`${getImagePrefix()}images/banner/doctor.png`}
                alt="Doctor"
                width={1150}
                height={1150}
              />  
            </div>
            
   
          </motion.div>
          <motion.div
            {...rightAnimation}
            className="col-span-7 lg:block hidden"
          >
           
          </motion.div>
        </div>

      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          PHÂN TÍCH X-QUANG NGỰC TỰ ĐỘNG
        </h1>
        <p className="text-base md:text-lg mb-6">
          Ứng dụng AI chẩn đoán sớm bệnh lý hô hấp từ ảnh X-quang.
        </p>
        <Link
          href="/truyen"
          className="inline-block bg-white text-indigo-700 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Chẩn đoán ngay
        </Link>
      </div>

  
    
    </div>
  );
};

export default Banner;
