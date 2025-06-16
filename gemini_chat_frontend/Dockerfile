# gemini_chat_frontend/Dockerfile

# ---- Stage 1: Build React App ----
FROM node:18-alpine AS build-stage

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json (hoặc yarn.lock)
COPY package*.json ./
# COPY yarn.lock ./ # Nếu dùng yarn

# Cài đặt dependencies
RUN npm install
# RUN yarn install # Nếu dùng yarn

# Sao chép toàn bộ mã nguồn frontend
COPY . .

# Build ứng dụng React
# Biến môi trường VITE_API_URL sẽ được thiết lập để trỏ tới proxy path của Nginx
# Chúng ta sẽ gọi API tới /GeminiChat/api/... từ React app
ENV VITE_API_URL=/GeminiChat/api
RUN npm run build
# RUN yarn build # Nếu dùng yarn

# ---- Stage 2: Serve with Nginx ----
FROM nginx:stable-alpine AS production-stage

# Sao chép thư mục build từ stage trước vào thư mục phục vụ web của Nginx
# Thư mục build mặc định của Vite là 'dist', của Create React App là 'build'
# Kiểm tra lại tên thư mục build của bạn (ví dụ: gemini_chat_frontend/dist)
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Nếu dùng Create React App, thư mục build thường là 'build':
# COPY --from=build-stage /app/build /usr/share/nginx/html

# Sao chép file cấu hình Nginx tùy chỉnh
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở port 80 (port mặc định của Nginx)
EXPOSE 80

# Lệnh để chạy Nginx
CMD ["nginx", "-g", "daemon off;"]