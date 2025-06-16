# Sử dụng một Python base image chính thức.
# python:3.9-slim là một lựa chọn tốt, nhẹ nhàng.
FROM python:3.9-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Cài đặt các dependencies hệ thống nếu cần (ví dụ: nếu thư viện Python nào đó yêu cầu)
# RUN apt-get update && apt-get install -y --no-install-recommends some-package && rm -rf /var/lib/apt/lists/*

# Sao chép file requirements.txt vào thư mục làm việc
COPY requirements.txt .

# Cài đặt các Python dependencies
# --no-cache-dir để không lưu cache, giúp image nhỏ hơn
# --trusted-host pypi.python.org -U pip setuptools # Dòng này có thể cần nếu có vấn đề với SSL/TLS khi tải pip
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn của ứng dụng vào thư mục làm việc
COPY ./app ./app

# Mở port mà Uvicorn sẽ chạy (ví dụ: 8000)
EXPOSE 8000

# Biến môi trường cho GOOGLE_API_KEY sẽ được truyền vào từ docker-compose
# ENV GOOGLE_API_KEY YOUR_API_KEY_HERE # Không nên hardcode ở đây

# Lệnh để chạy ứng dụng khi container khởi động
# --host 0.0.0.0 để Uvicorn lắng nghe trên tất cả các network interfaces trong container
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]