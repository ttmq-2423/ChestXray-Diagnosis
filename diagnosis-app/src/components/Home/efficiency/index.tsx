"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Database, 
  Brain, 
  BarChart3, 
  Target, 
  Settings, 
  TrendingUp,
  Users,
  Calendar,
  Layers,
  Zap,
  Award,
  Activity
} from "lucide-react";

const Efficiency = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  // Enhanced animation variants
  const slideInLeft = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const slideInRight = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const numberCountAnimation = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 1, ease: "easeOut", delay: 0.5 }
  };

  const iconFloat = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const progressBar = {
    initial: { width: 0 },
    animate: { width: "100%" },
    transition: { duration: 1.5, ease: "easeOut", delay: 0.8 }
  };

  const cardHover = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const glowEffect = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(59, 130, 246, 0.5)",
        "0 0 20px rgba(59, 130, 246, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Thông tin Dataset CheXpert
  const datasetInfo = [
    { 
      icon: Database, 
      title: "Tổng số ảnh", 
      value: "224,316", 
      color: "text-primary",
      description: "ảnh X-quang ngực chất lượng cao"
    },
    { 
      icon: Users, 
      title: "Số bệnh nhân", 
      value: "65,240", 
      color: "text-green-500",
      description: "bệnh nhân nội trú và ngoại trú"
    },
    { 
      icon: Calendar, 
      title: "Thời gian thu thập", 
      value: "2002-2017", 
      color: "text-purple-500",
      description: "từ Stanford Medical Center"
    },
    { 
      icon: Brain, 
      title: "Gán nhãn", 
      value: "Tự động NLP", 
      color: "text-orange-500",
      description: "từ báo cáo y khoa chuyên nghiệp"
    }
  ];

  // Thông tin Model Architecture
  const modelArchitecture = [
    { 
      icon: Layers, 
      title: "Base Model", 
      value: "ConvNeXt-MobileViT-Tiny",
      color: "text-red-500"
    },
    { 
      icon: Settings, 
      title: "Input Shape", 
      value: "224×224×3",
      color: "text-primary"
    },
    { 
      icon: Zap, 
      title: "Features", 
      value: "384 channels",
      color: "text-green-500"
    },
    { 
      icon: Target, 
      title: "Output Classes", 
      value: "5 diseases",
      color: "text-purple-500"
    }
  ];

  // Kết quả hiệu suất theo từng bệnh
  const diseasePerformance = [
    { disease: "Cardiomegaly", auc: "90.00", color: "bg-red-500" },
    { disease: "Edema", auc: "90.50", color: "bg-blue-500" },
    { disease: "Consolidation", auc: "93.00", color: "bg-green-500" },
    { disease: "Atelectasis", auc: "83.90", color: "bg-orange-500" },
    { disease: "Pleural Effusion", auc: "95.60", color: "bg-purple-500" }
  ];

  // Chia tách dataset
  const datasetSplit = [
    { 
      title: "Training Set", 
      images: "223,414", 
      patients: "64,540",
      description: "Tập huấn luyện với nhãn tự động từ NLP"
    },
    { 
      title: "Validation Set", 
      images: "234", 
      patients: "234",
      description: "Nhãn được xác thực bởi bác sĩ X-quang"
    },
    { 
      title: "Test Set", 
      images: "668", 
      patients: "668",
      description: "Đánh giá hiệu suất cuối cùng"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" id="efficiency">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        {/* Header Section */}
        <motion.div 
          ref={ref}
          initial={fadeInUp.initial}
          animate={inView ? fadeInUp.animate : fadeInUp.initial}
          transition={fadeInUp.transition}
          className="text-center mb-20"
        >
          <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-black mb-6"
          >
            Thông tin về <motion.span 
              className="text-primary"
              animate={inView ? {
                background: [
                  "linear-gradient(45deg, #3B82F6, #8B5CF6)",
                  "linear-gradient(45deg, #8B5CF6, #06B6D4)",
                  "linear-gradient(45deg, #06B6D4, #3B82F6)"
                ],
                backgroundClip: "text",
                WebkitBackgroundClip: "text"
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Model & Dataset
            </motion.span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Hệ thống sử dụng dataset CheXpert từ Stanford và mô hình ConvNeXt-MobileViT-Tiny tiên tiến
          </motion.p>
        </motion.div>

        {/* Dataset Information */}
        <motion.div 
          initial={staggerContainer.initial}
          animate={inView ? staggerContainer.animate : staggerContainer.initial}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={staggerItem.initial}
              animate={inView ? staggerItem.animate : staggerItem.initial}
              transition={staggerItem.transition}
              className="inline-flex items-center gap-3 mb-6"
            >
              <motion.div
                variants={iconFloat}
                animate={inView ? "animate" : "initial"}
              >
                <Database className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-3xl font-bold text-black">Dataset CheXpert</h3>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Một trong những tập dữ liệu X-quang ngực lớn nhất từ Stanford University Medical Center
            </motion.p>
          </div>

          {/* Main Dataset Stats */}
          <motion.div
            initial={staggerItem.initial}
            animate={inView ? staggerItem.animate : staggerItem.initial}
            transition={{ ...staggerItem.transition, delay: 0.1 }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <motion.div 
                initial={slideInLeft.initial}
                animate={inView ? slideInLeft.animate : slideInLeft.initial}
                transition={{ ...slideInLeft.transition, delay: 0.3 }}
                whileHover={cardHover.hover}
                className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8"
              >
                <motion.div
                  variants={iconFloat}
                  animate={inView ? "animate" : "initial"}
                >
                  <Database className="w-16 h-16 text-primary mx-auto mb-4" />
                </motion.div>
                <h4 className="text-xl font-semibold text-gray-600 mb-2">Tổng số ảnh</h4>
                <motion.p 
                  {...numberCountAnimation}
                  className="text-5xl font-bold text-black mb-2"
                >
                  224,316
                </motion.p>
                <p className="text-gray-500">ảnh X-quang ngực chất lượng cao</p>
              </motion.div>
              <motion.div 
                initial={slideInRight.initial}
                animate={inView ? slideInRight.animate : slideInRight.initial}
                transition={{ ...slideInRight.transition, delay: 0.3 }}
                whileHover={cardHover.hover}
                className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8"
              >
                <motion.div
                  variants={iconFloat}
                  animate={inView ? "animate" : "initial"}
                >
                  <Users className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h4 className="text-xl font-semibold text-gray-600 mb-2">Số bệnh nhân</h4>
                <motion.p 
                  {...numberCountAnimation}
                  className="text-5xl font-bold text-black mb-2"
                >
                  65,240
                </motion.p>
                <p className="text-gray-500">bệnh nhân nội trú và ngoại trú</p>
              </motion.div>
            </div>
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <p className="text-lg text-gray-600">Thu thập từ <span className="font-semibold text-primary">Stanford Medical Center</span> (2002-2017)</p>
              <p className="text-lg text-gray-600 mt-2">Gán nhãn tự động bằng <span className="font-semibold text-orange-500">NLP</span> từ báo cáo y khoa</p>
            </motion.div>
          </motion.div>

          {/* Dataset Split */}
          <motion.div
            initial={staggerItem.initial}
            animate={inView ? staggerItem.animate : staggerItem.initial}
            transition={{ ...staggerItem.transition, delay: 0.5 }}
          >
            <motion.h4 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-2xl font-bold text-black mb-8 text-center"
            >
              Phân chia Dataset
            </motion.h4>
            <div className="grid md:grid-cols-3 gap-8">
              {datasetSplit.map((split, index) => (
                <motion.div 
                  key={index} 
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={inView ? { y: 0, opacity: 1, scale: 1 } : { y: 50, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  className="text-center bg-white/30 backdrop-blur-sm rounded-xl p-6"
                >
                  <h5 className="text-lg font-semibold text-primary mb-4">{split.title}</h5>
                  <div className="space-y-3 mb-4">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="flex justify-between"
                    >
                      <span className="text-gray-600">Ảnh:</span>
                      <span className="font-bold text-black">{split.images}</span>
                    </motion.div>
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                      className="flex justify-between"
                    >
                      <span className="text-gray-600">Bệnh nhân:</span>
                      <span className="font-bold text-black">{split.patients}</span>
                    </motion.div>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="text-sm text-gray-500"
                  >
                    {split.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Model Architecture */}
        <motion.div 
          initial={staggerContainer.initial}
          animate={inView ? staggerContainer.animate : staggerContainer.initial}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={staggerItem.initial}
              animate={inView ? staggerItem.animate : staggerItem.initial}
              transition={{ ...staggerItem.transition, delay: 0.7 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <motion.div
                variants={iconFloat}
                animate={inView ? "animate" : "initial"}
              >
                <Brain className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-3xl font-bold text-black">Model ConvNeXt-MobileViT-Tiny</h3>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Kết hợp sức mạnh của ConvNeXt và MobileViT cho hiệu suất tối ưu
            </motion.p>
          </div>

          {/* Model Architecture Details */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={slideInLeft.initial}
                animate={inView ? slideInLeft.animate : slideInLeft.initial}
                transition={{ ...slideInLeft.transition, delay: 1.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    variants={iconFloat}
                    animate={inView ? "animate" : "initial"}
                  >
                    <Layers className="w-8 h-8 text-red-500" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-black">ConvNeXt Blocks</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Depthwise convolution", value: "7×7" },
                    { label: "Stages", value: "3 (96, 192, 384)" },
                    { label: "Final stage blocks", value: "27" },
                    { label: "Normalization", value: "LayerNorm + DropPath" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ x: -30, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                      className="flex justify-between items-center py-3"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold text-black">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={slideInRight.initial}
                animate={inView ? slideInRight.animate : slideInRight.initial}
                transition={{ ...slideInRight.transition, delay: 1.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    variants={iconFloat}
                    animate={inView ? "animate" : "initial"}
                  >
                    <Brain className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-black">MobileViT Block</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Representation", value: "Local + Global" },
                    { label: "Encoders", value: "Transformer" },
                    { label: "Dimension", value: "384, Linear: 768" },
                    { label: "Attention", value: "Multi-head" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ x: 30, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                      className="flex justify-between items-center py-3"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold text-black">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="border-t border-white/20 mt-8 pt-8"
            >
              <div className="grid md:grid-cols-4 gap-6 text-center">
                {[
                  { icon: Settings, color: "text-primary", label: "Input Shape", value: "224×224×3" },
                  { icon: Zap, color: "text-green-500", label: "Features", value: "384 channels" },
                  { icon: Target, color: "text-purple-500", label: "Output Classes", value: "5 diseases" },
                  { icon: Layers, color: "text-red-500", label: "Base Model", value: "ConvNeXt-MobileViT" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      variants={iconFloat}
                      animate={inView ? "animate" : "initial"}
                    >
                      <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2`} />
                    </motion.div>
                    <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                    <p className={`font-bold text-black ${index === 3 ? 'text-xs' : ''}`}>{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Performance Results */}
        <motion.div 
          initial={staggerContainer.initial}
          animate={inView ? staggerContainer.animate : staggerContainer.initial}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={staggerItem.initial}
              animate={inView ? staggerItem.animate : staggerItem.initial}
              transition={{ ...staggerItem.transition, delay: 1.4 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <motion.div
                variants={iconFloat}
                animate={inView ? "animate" : "initial"}
              >
                <BarChart3 className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-3xl font-bold text-black">Kết quả Hiệu suất</h3>
            </motion.div>
          </div>

          {/* Performance Results - Hero */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
            animate={inView ? { 
              scale: 1, 
              opacity: 1, 
              rotateX: 0,
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.3)"
              ]
            } : { scale: 0.8, opacity: 0, rotateX: 20 }}
            transition={{ 
              scale: { duration: 1, delay: 1.6 },
              opacity: { duration: 1, delay: 1.6 },
              rotateX: { duration: 1, delay: 1.6 },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.6 }
            }}
            className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 md:p-12 mb-8 text-white text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.8, delay: 1.8, type: "spring", stiffness: 200 }}
            >
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            </motion.div>
            <motion.h4 
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              AUC Trung bình
            </motion.h4>
            <motion.p 
              initial={{ scale: 0.3, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
              transition={{ duration: 1.2, delay: 2.2, type: "spring", stiffness: 150 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              90.70%
            </motion.p>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="text-xl opacity-90"
            >
              Hiệu suất tổng thể của mô hình
            </motion.p>
          </motion.div>

          {/* Disease Performance */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="bg-white/40 backdrop-blur-sm rounded-xl p-6 md:p-8"
          >
            <motion.h4 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, delay: 2.8 }}
              className="text-2xl font-bold text-black mb-6 text-center"
            >
              Hiệu suất theo từng bệnh
            </motion.h4>
            <div className="grid md:grid-cols-5 gap-4">
              {diseasePerformance.map((disease, index) => (
                <motion.div 
                  key={index} 
                  initial={{ y: 30, opacity: 0, scale: 0.8 }}
                  animate={inView ? { y: 0, opacity: 1, scale: 1 } : { y: 30, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 3 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="text-center"
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-lg ${disease.color} mx-auto mb-3 flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Activity className="w-6 h-6 text-white" />
                  </motion.div>
                  <h5 className="text-sm font-semibold text-black mb-1">{disease.disease}</h5>
                  <motion.p 
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 3.2 + index * 0.1 }}
                    className="text-xl font-bold text-primary"
                  >
                    {disease.auc}%
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Efficiency;