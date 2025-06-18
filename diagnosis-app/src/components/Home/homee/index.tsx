"use client";


import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { 
  Heart, 
  Droplets,
  TrendingDown, 
  Waves,
  Zap,
  Target,
  Settings
} from "lucide-react";
import { getImagePrefix } from "@/utils/utils";

const Homee = () => {
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

  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  // Dữ liệu bệnh lý với icon từ Lucide React
  const diseaseInfo = [
    {
      name: "Tim to (Cardiomegaly)",
      description: "Tình trạng tim lớn bất thường, thường do suy tim, tăng huyết áp",
      icon: Heart,
      color: "text-red-500"
    },
    {
      name: "Phù phổi (Edema)",
      description: "Dịch tích tụ trong phổi, thường do suy tim trái",
      icon: Droplets,
      color: "text-blue-500"
    },
    {
      name: "Đông đặc phổi (Consolidation)",
      description: "Nhu mô phổi đặc lại do viêm phổi hoặc xuất huyết",
      icon: Droplets,
      color: "text-purple-500"
    },
    {
      name: "Xẹp phổi (Atelectasis)",
      description: "Một phần phổi bị xẹp do tắc nghẽn phế quản",
      icon: TrendingDown,
      color: "text-orange-500"
    },
    {
      name: "Tràn dịch màng phổi (Pleural Effusion)",
      description: "Dịch tích tụ khoang màng phổi do nhiều nguyên nhân",
      icon: Waves,
      color: "text-cyan-500"
    }
  ];

  const highlights = [
    {
      icon: Zap,
      title: "Tốc độ vượt trội",
      content: "Giảm thời gian chẩn đoán từ vài giờ xuống còn vài giây",
      color: "text-yellow-500"
    },
    {
      icon: Target,
      title: "Độ chính xác cao",
      content: "AUC lên đến 90.7% trên bộ dữ liệu CheXpert",
      color: "text-green-500"
    },
    {
      icon: Settings,
      title: "Công nghệ đột phá",
      content: "Mô hình lai Conv-MobileViT-Tiny tiên tiến",
      color: "text-blue-500"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative md:pt-40 md:pb-28 py-20 overflow-hidden z-1" id="home">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="grid grid-cols-12 gap-8">
            <motion.div {...leftAnimation} className="lg:col-span-7 col-span-12">
              <div className="flex gap-6 items-center lg:justify-start justify-center mb-5 mt-24">
                <p className="text-black sm:text-28 text-18 mb-0">
                  PHÂN TÍCH X-QUANG NGỰC TỰ ĐỘNG  
                </p>
              </div>
              <h1 className="font-medium lg:text-76 md:text-70 text-54 lg:text-start text-center text-black mb-10">
                DEEP CHEST 
                <span className="text-primary"> AI</span>
              </h1>
              <div className="flex items-center md:justify-start justify-center gap-8 mb-10">
                <Link
                  href="/#diagnosis"
                  className="bg-primary border border-primary rounded-lg text-21 font-medium hover:bg-transparent hover:text-primary text-white py-2 px-7 z-50 transition-all duration-300"
                >
                  Chẩn đoán ngay
                </Link>
              </div>
              <div className="col-span-full text-left">
                <p className="text-lg text-black leading-relaxed">
                  Hệ thống hỗ trợ bác sĩ trong việc phân tích hình ảnh X-quang ngực,
                  giúp nâng cao độ chính xác và phát hiện sớm các bệnh lý hô hấp.
                </p>
              </div>

              {/* Điểm nổi bật */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                {highlights.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div 
                      key={index} 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                    >
                      <IconComponent className={`w-8 h-8 mb-3 ${item.color}`} />
                      <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.content}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div {...rightAnimation} className="col-span-5 lg:block hidden mb-0">
              <div className="absolute right-0 mb-0">
                <Image
                  src={`${getImagePrefix()}images/banner/doctor.png`}
                  alt="Banner"
                  width={600}
                  height={600}
                />
              </div>
            </motion.div>
          </div>
        
          <div className="absolute w-50 h-50 bg-gradient-to-bl from-tealBlue from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1"></div>
        </div>
      </section>

      {/* Diseases Detection Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-black mb-6">
              5 Bệnh lý có thể phát hiện
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hệ thống AI của chúng tôi có khả năng phát hiện và phân tích chính xác 5 loại bệnh lý phổ biến từ hình ảnh X-quang ngực
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {diseaseInfo.map((disease, index) => {
              const IconComponent = disease.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full bg-gray-100 ${disease.color}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-black mb-2">{disease.name}</h4>
                      <p className="text-gray-700 leading-relaxed">{disease.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
              <h3 className="text-2xl font-bold text-black mb-4">
                Sẵn sàng trải nghiệm?
              </h3>
              <p className="text-gray-600 mb-6">
                Tải lên hình ảnh X-quang ngực để bắt đầu phân tích
              </p>
              <Link
                href="/#diagnosis"
                className="bg-primary border border-primary rounded-lg text-lg font-medium hover:bg-transparent hover:text-primary text-white py-3 px-8 transition-all duration-300 inline-block"
              >
                Bắt đầu chẩn đoán
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Homee;