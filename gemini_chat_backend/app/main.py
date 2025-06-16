# gemini_chat_backend/app/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import ChatRequest, ChatResponse
from .services import get_gemini_response

app = FastAPI(
    title="Gemini Chat API",
    description="API backend cho ứng dụng chat đơn giản với Google Gemini",
    version="0.1.0"
)

# Cấu hình CORS để cho phép TẤT CẢ các origin
# LƯU Ý: Cẩn thận khi sử dụng "*" trong môi trường production.
# Nếu allow_origins là ["*"], thì allow_credentials PHẢI là False.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các origin
    allow_credentials=False, # PHẢI là False nếu allow_origins là ["*"]
    allow_methods=["*"],    # Cho phép tất cả các method
    allow_headers=["*"],    # Cho phép tất cả các header
)

# ... (phần còn lại của code API endpoints) ...

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_gemini(request_data: ChatRequest):
    print(f"Received message: {request_data.message}")
    print(f"Received history length: {len(request_data.history)}")
    try:
        ai_reply = await get_gemini_response(request_data.message, request_data.history)
        return ChatResponse(reply=ai_reply)
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="Lỗi máy chủ nội bộ.")

@app.get("/")
async def read_root():
    return {"message": "Chào mừng bạn đến với Gemini Chat API!"}