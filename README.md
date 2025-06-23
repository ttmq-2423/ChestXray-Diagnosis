# Deep Chest AI - Hệ Thống Phân Tích X-quang Ngực Tự Động

**Deep Chest AI** là một hệ thống tiên tiến được thiết kế để hỗ trợ các bác sĩ trong việc phân tích hình ảnh X-quang ngực, nhằm nâng cao độ chính xác trong chẩn đoán và phát hiện sớm các bệnh lý hô hấp. Hệ thống tận dụng sức mạnh của Trí tuệ nhân tạo, đặc biệt là các mô hình học sâu, để cung cấp kết quả nhanh chóng và đáng tin cậy.

## Cấu Trúc Thư Mục

Dưới đây là cấu trúc thư mục chính của dự án:
```
IEC2021IoT14_ChestXray-Diagnosis/
├── diagnosis-app/
│   ├── .dockerignore
│   ├── .env
│   ├── Dockerfile
│   ├── public/
│   ├── scr/
│   └── next.config.mjs
|   ..................
└── docker-compose.yml
```

## Chức Năng Chính

* **Phân tích X-quang ngực tự động:** Hệ thống tự động xử lý và phân tích hình ảnh X-quang ngực, cung cấp kết quả chẩn đoán nhanh chóng và chính xác.
* **Phát hiện 5 bệnh lý chính:** Khả năng nhận diện và phân loại các bệnh lý phổ biến trên ảnh X-quang ngực, bao gồm:
    * **Tim to (Cardiomegaly):** Tình trạng tim lớn bất thường, thường do suy tim, tăng huyết áp.
    * **Phù phổi (Edema):** Dịch tích tụ trong phổi, thường do suy tim trái.
    * **Đông đặc phổi (Consolidation):** Nhu mô phổi đặc lại do viêm phổi hoặc xuất huyết.
    * **Xẹp phổi (Atelectasis):** Một phần phổi bị xẹp do tắc nghẽn phế quản.
    * **Tràn dịch màng phổi (Pleural Effusion):** Dịch tích tụ khoang màng phổi do nhiều nguyên nhân.
* **Tốc độ vượt trội:** Giảm thời gian chẩn đoán từ vài giờ xuống còn vài giây, tăng cường hiệu quả công việc.
* **Độ chính xác cao:** Đạt hiệu suất cao trong chẩn đoán, với AUC trung bình lên đến 90.7% trên bộ dữ liệu CheXpert.

## Công Nghệ & Kiến Trúc

### Dataset CheXpert

Hệ thống được huấn luyện và đánh giá trên bộ dữ liệu **CheXpert** từ Stanford University Medical Center, một trong những tập dữ liệu X-quang ngực lớn nhất:

* **Tổng số ảnh:** 224,316 ảnh X-quang ngực chất lượng cao.
* **Số bệnh nhân:** 65,240 bệnh nhân nội trú và ngoại trú.
* **Thời gian thu thập:** Từ năm 2002 đến 2017.
* **Gán nhãn:** Tự động bằng công nghệ Xử lý ngôn ngữ tự nhiên (NLP) từ các báo cáo y khoa chuyên nghiệp.

**Phân chia Dataset:**

* **Training Set:** 223,414 ảnh, 64,540 bệnh nhân (nhãn tự động từ NLP).
* **Validation Set:** 234 ảnh, 234 bệnh nhân (nhãn được xác thực bởi bác sĩ X-quang).
* **Test Set:** 668 ảnh, 668 bệnh nhân (đánh giá hiệu suất cuối cùng).

### Model ConvNeXt-MobileViT-Tiny

Hệ thống sử dụng mô hình lai **ConvNeXt-MobileViT-Tiny**, kết hợp sức mạnh của ConvNeXt và MobileViT để đạt được hiệu suất tối ưu:

* **Base Model:** ConvNeXt-MobileViT-Tiny.
* **Input Shape:** 224×224×3.
* **Features:** 384 channels.
* **Output Classes:** 5 bệnh lý.

**Chi tiết kiến trúc:**

* **ConvNeXt Blocks:**
    * Depthwise convolution: 7×7.
    * Stages: 3 (96, 192, 384).
    * Final stage blocks: 27.
    * Normalization: LayerNorm + DropPath.
* **MobileViT Block:**
    * Representation: Local + Global.
    * Encoders: Transformer.
    * Dimension: 384, Linear: 768.
    * Attention: Multi-head.

### Kết quả Hiệu suất (AUC)

| Bệnh Lý             | AUC (%) |
| :------------------ | :------ |
| Cardiomegaly        | 90.00   |
| Edema               | 90.50   |
| Consolidation       | 93.00   |
| Atelectasis         | 83.90   |
| Pleural Effusion    | 95.60   |
| **AUC Trung bình** | **90.70** |

## Công Nghệ Sử Dụng

* **Next.js:** Framework React cho ứng dụng web.
* **React:** Thư viện JavaScript để xây dựng giao diện người dùng.
* **Framer Motion:** Thư viện hoạt ảnh cho React để tạo hiệu ứng mượt mà.
* **Lucide React:** Thư viện biểu tượng.
* **Tailwind CSS:** Framework CSS utility-first để tạo kiểu nhanh chóng và linh hoạt.
* **AOS (Animate On Scroll):** Thư viện để thêm hiệu ứng scroll-based animations.

## Cài Đặt và Chạy Ứng Dụng Cục Bộ (Sử dụng Docker Compose)

Để thiết lập và chạy ứng dụng này cục bộ bằng Docker Compose, hãy làm theo các bước sau:

1.  **Clone repository:**
    ```bash
    git clone https://github.com/IECResearchGroup/IEC2021IoT14_ChestXray-Diagnosis.git 
    cd IEC2021IoT14_ChestXray-Diagnosis 
    ```

2.  **Chuẩn bị môi trường Docker:**
    Đảm bảo đã cài đặt Docker và Docker Compose trên hệ thống.

3.  **Xây dựng và chạy ứng dụng với Docker Compose:**
    Dự án được cấu hình để chạy một service `nextjs-app` trong Docker Compose. Service này sẽ xây dựng ứng dụng Next.js từ thư mục `diagnosis-app` và ánh xạ cổng nội bộ `3000` ra cổng `21014` trên máy host của bạn.

    Từ thư mục gốc của dự án (nơi chứa file `docker-compose.yml`), chạy lệnh sau để xây dựng image và khởi động container:
    ```bash
    docker compose up --build -d
    ```
    * `--build`: Buộc Docker Compose xây dựng lại image từ Dockerfile.
    * `-d`: Chạy container ở chế độ nền (detached mode).

4.  **Truy cập ứng dụng:**
    Vì ứng dụng được host với subfolder `ChestXray-Diagnosis/`, có thể truy cập ứng dụng trên trình duyệt tại địa chỉ:
    `http://localhost:21014/ChestXray-Diagnosis/`

    Nếu triển khai trên một máy ảo (VM), hãy thay thế `localhost` bằng địa chỉ IP của máy ảo đó (ví dụ: `http://192.168.223.166:21014/ChestXray-Diagnosis/`).

    Nếu gặp lỗi như `404 Not Found` hoặc `Uncaught Error: Minified React error #418`, điều này có thể liên quan đến việc cấu hình đường dẫn `basePath` trong Next.js (`next.config.mjs`) hoặc cách các tài nguyên tĩnh được phục vụ khi chạy trong môi trường có subfolder.


Hệ thống được thiết kế với kiến trúc hiện đại và tập trung vào việc cung cấp một công cụ chẩn đoán hiệu quả và chính xác cho cộng đồng y tế.
