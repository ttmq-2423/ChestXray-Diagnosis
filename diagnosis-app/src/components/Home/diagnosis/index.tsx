"use client";
import { useState, useRef, useCallback } from "react";
import MyVideoPlayer from "./video";
import { motion } from "framer-motion";
import { 
  Upload, 
  X, 
  FileImage, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Heart, 
  Droplets, 
  TrendingDown, 
  Waves,
  Activity,
  Download,
  RefreshCw,
  Info,
  Shield,
  AlertTriangle
} from "lucide-react";

// Type definitions for simplified response
interface DetectedCondition {
  name: string;
  description: string;
  causes: string;
  nextSteps: string;
}

interface AnalysisResults {
  detected_diseases: string[];
  message: string;
  processing_time?: string;
  model_version?: string;
}

interface DiseaseIconInfo {
  icon: any;
  color: string;
  bgColor: string;
}

const Diagnosis = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Animation variants
  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  };

  // Disease icons and colors
  const diseaseIcons: Record<string, DiseaseIconInfo> = {
    "Cardiomegaly": { icon: Heart, color: "text-red-500", bgColor: "bg-red-50" },
    "Edema": { icon: Droplets, color: "text-blue-500", bgColor: "bg-blue-50" },
    "Consolidation": { icon: Droplets, color: "text-purple-500", bgColor: "bg-purple-50" },
    "Atelectasis": { icon: TrendingDown, color: "text-orange-500", bgColor: "bg-orange-50" },
    "Pleural Effusion": { icon: Waves, color: "text-cyan-500", bgColor: "bg-cyan-50" }
  };

  // Handle drag and drop
  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file hình ảnh!');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File quá lớn! Vui lòng chọn file nhỏ hơn 10MB.');
      return;
    }

    setUploadedImage(file);
    setError(null);
    
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    setAnalysisResults(null);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setAnalysisResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Helper functions for condition details
  const getConditionDescription = (name: string): string => {
    const descriptions: Record<string, string> = {
      "Cardiomegaly": "Tình trạng tim to bất thường, kích thước tim lớn hơn bình thường so với lồng ngực.",
      "Edema": "Tình trạng tích tụ dịch trong mô phổi, làm giảm khả năng trao đổi khí.",
      "Consolidation": "Tình trạng mô phổi bị đông đặc do viêm nhiễm hoặc tích tụ chất lỏng.",
      "Atelectasis": "Tình trạng xẹp phổi một phần hoặc toàn bộ do tắc nghẽn đường thở hoặc nén ép.",
      "Pleural Effusion": "Tình trạng tích tụ dịch trong khoang màng phổi giữa hai lớp màng phổi."
    };
    return descriptions[name] || "Bệnh lý được phát hiện trên phim X-quang ngực";
  };

  const getConditionCauses = (name: string): string => {
    const causes: Record<string, string> = {
      "Cardiomegaly": "Có thể do tăng huyết áp, bệnh van tim, bệnh cơ tim, thiếu máu mãn tính, hoặc các bệnh tim bẩm sinh.",
      "Edema": "Thường do suy tim, bệnh thận, nhiễm trùng phổi, hoặc tăng áp lực mao mạch phổi.",
      "Consolidation": "Thường do viêm phổi do vi khuẩn, virus, hoặc nấm; có thể do xuất huyết phổi hoặc khối u.",
      "Atelectasis": "Do tắc nghẽn đường thở, nén ép phổi từ bên ngoài, hoặc giảm surfactant trong phổi.",
      "Pleural Effusion": "Có thể do suy tim, viêm phổi, ung thư, bệnh thận, hoặc chấn thương ngực."
    };
    return causes[name] || "Cần thêm thông tin từ bác sĩ để xác định nguyên nhân cụ thể";
  };

  const getConditionNextSteps = (name: string): string => {
    const nextSteps: Record<string, string> = {
      "Cardiomegaly": "Thăm khám tim mạch để siêu âm tim, điện tâm đồ, và xét nghiệm máu. Có thể cần MRI tim hoặc thông tim tùy tình trạng.",
      "Edema": "Cần khám nội khoa để xác định nguyên nhân, có thể cần siêu âm tim, xét nghiệm chức năng thận và gan.",
      "Consolidation": "Cần thăm khám hô hấp khẩn cấp, có thể cần kháng sinh, xét nghiệm đờm, và theo dõi sát.",
      "Atelectasis": "Thăm khám phổi để đánh giá mức độ, có thể cần nội soi phế quản hoặc CT phổi để tìm nguyên nhân.",
      "Pleural Effusion": "Cần thăm khám để xác định lượng dịch, có thể cần chọc dịch màng phổi để xét nghiệm và giảm áp lực."
    };
    return nextSteps[name] || "Tham khảo bác sĩ chuyên khoa để được tư vấn và điều trị phù hợp";
  };

  // Transform detected diseases to condition objects
  const transformDetectedDiseasesToConditions = (
    detectedDiseases?: string[] | null
  ): DetectedCondition[] => {
    if (!Array.isArray(detectedDiseases)) return [];

    return detectedDiseases.map(diseaseName => ({
      name: diseaseName,
      description: getConditionDescription(diseaseName),
      causes: getConditionCauses(diseaseName),
      nextSteps: getConditionNextSteps(diseaseName),
    }));
  };

  // Call API to analyze image
  const analyzeImage = async (): Promise<void> => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Convert image to base64
      const reader = new FileReader();
      const base64Image = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result?.toString();
          if (result) {
            resolve(result.split(',')[1]); // Remove data URL prefix
          } else {
            reject(new Error('Failed to read image'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(uploadedImage);
      });

      const startTime = Date.now();
      const response = await fetch(
        'https://ji2izuollh.execute-api.us-east-1.amazonaws.com/test-pro/', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64Image }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const res = await response.json();
      const bodyString = res.body as string;
      const data: AnalysisResults = JSON.parse(bodyString);

      const endTime = Date.now();
      data.processing_time = `${((endTime - startTime) / 1000).toFixed(2)}s`;
      data.model_version = " ";
      data.detected_diseases = data.detected_diseases || [];

      console.log("Parsed body:", data);
      setAnalysisResults(data);
      console.log("Detected diseases:", data.detected_diseases);
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Có lỗi xảy ra khi phân tích hình ảnh. Vui lòng thử lại.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadReport = (): void => {
    if (!analysisResults) return;
    
    const detectedConditions = transformDetectedDiseasesToConditions(analysisResults.detected_diseases);

    const reportData = {
      timestamp: new Date().toLocaleString('vi-VN'),
      analysis_type: "Threshold-based Detection",
      results: {
        ...analysisResults,
        detected_conditions: detectedConditions,
        total_conditions_detected: detectedConditions.length,
      },
      patient_note: "Kết quả này chỉ mang tính chất tham khảo. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa."
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chest_xray_analysis_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetAnalysis = (): void => {
    setUploadedImage(null);
    setImagePreview(null);
    setAnalysisResults(null);
    setIsAnalyzing(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Calculate derived data for display
  const detectedConditions = analysisResults ? transformDetectedDiseasesToConditions(analysisResults.detected_diseases) : [];
  const totalConditionsDetected = detectedConditions.length;
  const hasDetectedDiseases = analysisResults?.detected_diseases && analysisResults.detected_diseases.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-20" id="diagnosis">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-6">
            Chẩn đoán X-quang ngực thông minh
          </h1>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div {...fadeInUp} className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-black mb-6 flex items-center gap-3">
                <Upload className="w-6 h-6 text-blue-500" />
                Tải lên hình ảnh
              </h2>

              {!imagePreview ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Kéo thả hình ảnh vào đây
                  </p>
                  <p className="text-gray-500 mb-6">
                    hoặc click để chọn file
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    Chọn file
                  </button>
                  <p className="text-sm text-gray-400 mt-4">
                    Hỗ trợ: JPG, PNG, DICOM (Tối đa 10MB)
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={imagePreview}
                      alt="X-ray preview"
                      className="w-full h-96 object-contain"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Đang phân tích...
                        </>
                      ) : (
                        <>
                          <Activity className="w-5 h-5" />
                          Phân tích với AI
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={resetAnalysis}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Làm mới
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div {...scaleIn} className="space-y-6">
            {isAnalyzing && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">
                  Đang phân tích ...
                </h3>
               
                <div className="mt-6 bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Đang kiểm tra 5 loại bệnh lý ...
                </p>
              </div>
            )}

            {analysisResults && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-black flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    Kết quả phân tích
                  </h2>
                  <button
                    onClick={downloadReport}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                  >
                    <Download className="w-4 h-4" />
                    Tải báo cáo
                  </button>
                </div>

                {/* Analysis Summary */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {totalConditionsDetected}
                      </div>
                      <div className="text-sm text-gray-600">Số bệnh lý phát hiện</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {hasDetectedDiseases ? "Phát hiện" : "Bình thường"}
                      </div>
                      <div className="text-sm text-gray-600">Trạng thái tổng quát</div>
                    </div>
                  </div>
                </div>

                {/* Detection Results */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black">
                      {hasDetectedDiseases ? "Các bệnh lý được phát hiện:" : "Kết quả phân tích:"}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      {analysisResults.model_version || 'v2.1-threshold'}
                    </div>
                  </div>
                  
                  {hasDetectedDiseases ? (
                    detectedConditions.map((condition, index) => {
                      const diseaseInfo = diseaseIcons[condition.name] || {
                        icon: AlertCircle,
                        color: "text-gray-500",
                        bgColor: "bg-gray-50"
                      };
                      const IconComponent = diseaseInfo.icon;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`${diseaseInfo.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-full bg-white ${diseaseInfo.color} shadow-sm`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-lg font-semibold text-black">
                                  {condition.name}
                                </h4>
                                <span className="text-sm font-medium text-white bg-red-500 px-3 py-1 rounded-full">
                                  Đã phát hiện
                                </span>
                              </div>
                              
                              {/* Mô tả bệnh */}
                              <div className="mb-4 p-3 bg-white rounded-lg border border-gray-100">
                                <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                  <Info className="w-4 h-4 text-blue-500" />
                                  Tình trạng:
                                </h5>
                                <p className="text-sm text-gray-700">{condition.description}</p>
                              </div>

                              {/* Nguyên nhân */}
                              <div className="mb-4 p-3 bg-white rounded-lg border border-gray-100">
                                <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-orange-500" />
                                  Nguyên nhân:
                                </h5>
                                <p className="text-sm text-gray-700">{condition.causes}</p>
                              </div>

                              {/* Giải pháp tiếp theo */}
                              <div className="p-3 bg-white rounded-lg border border-gray-100">
                                <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  Khuyến nghị:
                                </h5>
                                <p className="text-sm text-gray-700">{condition.nextSteps}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-green-800 mb-2">
                        Không phát hiện bệnh lý nào
                      </h4>
                      <p className="text-green-700">
                        {analysisResults.message || "Hình ảnh X-quang có vẻ bình thường"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Technical Details */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <strong>Thời gian xử lý:</strong> {analysisResults.processing_time || "N/A"}
                    </div>
              
                    <div>
                      <strong>Tổng số bệnh kiểm tra:</strong> 5 loại
                    </div>
                  
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Kết quả chỉ mang tính chất tham khảo, cần tham khảo bác sĩ chuyên khoa</li>
                        <li>Không thay thế được chẩn đoán và tư vấn y khoa chuyên nghiệp</li>
                        <li>Cần thăm khám trực tiếp để có chẩn đoán chính xác và điều trị phù hợp</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!imagePreview && !isAnalyzing && !analysisResults && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-500 mb-2">
                  Sẵn sàng phân tích 
                </h3>
                <p className="text-gray-400 mb-4">
                  Tải lên hình ảnh X-quang 
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>Cardiomegaly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    <span>Edema</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4" />
                    <span>Effusion</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    <span>Consolidation</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <TrendingDown  className="w-4 h-4" />
                    <span>Atelectasis</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-semibold text-black mb-6 text-center">
            Tính năng Multi-Label Classification
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Phát hiện đồng thời</h4>
              <p className="text-gray-600 text-sm">
                Có thể phát hiện nhiều bệnh lý cùng lúc trên một hình ảnh, không chỉ một bệnh duy nhất
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Độ tin cậy cao</h4>
              <p className="text-gray-600 text-sm">
                Mỗi bệnh lý được đánh giá độc lập với ngưỡng tin cậy riêng, đảm bảo độ chính xác
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Phân tích chi tiết</h4>
              <p className="text-gray-600 text-sm">
                Cung cấp mức độ nghiêm trọng và khuyến nghị cụ thể cho từng bệnh lý được phát hiện
              </p>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-semibold text-black mb-6 text-center">
            Hướng dẫn sử dụng
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-black mb-2">Tải lên hình ảnh</h4>
              <p className="text-gray-600 text-sm">
                Chọn hoặc kéo thả file X-quang ngực định dạng JPG, PNG hoặc DICOM
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold text-black mb-2">Phân tích Multi-Label</h4>
              <p className="text-gray-600 text-sm">
                AI sẽ quét và phát hiện tất cả các bệnh lý có thể có trên cùng một hình ảnh
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold text-black mb-2">Nhận kết quả chi tiết</h4>
              <p className="text-gray-600 text-sm">
                Xem danh sách các bệnh lý, mức độ nghiêm trọng và khuyến nghị cho từng bệnh
              </p>
            </div>
            
          </div>
        </motion.div>
      
      </div>
      <MyVideoPlayer/>
      
    </div>
    
  );
};

export default Diagnosis;