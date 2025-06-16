import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv() # Tải biến môi trường từ .env

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in environment variables. Please set it in .env file.")

genai.configure(api_key=GOOGLE_API_KEY)

# Chọn model, ví dụ: gemini-1.5-flash
model = genai.GenerativeModel('gemini-1.5-flash')

async def get_gemini_response(user_message: str, chat_history: list[dict[str, str]]) -> str:
    """
    Gửi tin nhắn tới Gemini API và nhận phản hồi.
    Hỗ trợ duy trì ngữ cảnh cuộc trò chuyện.
    """
    try:
        # Xây dựng lại lịch sử cho API, API yêu cầu 'parts' là một list
        formatted_history = []
        for item in chat_history:
            # Đảm bảo 'parts' luôn là list, ngay cả khi chỉ có một text part
            parts_content = item.get("parts")
            if isinstance(parts_content, str): # Nếu parts là string (từ client gửi lên đơn giản)
                 formatted_parts = [parts_content]
            elif isinstance(parts_content, list): # Nếu parts đã là list
                 formatted_parts = parts_content
            else: # Trường hợp không xác định, mặc định là empty list
                formatted_parts = []

            formatted_history.append({
                "role": item.get("role"),
                "parts": formatted_parts
            })


        # Khởi tạo chat session với lịch sử
        chat = model.start_chat(history=formatted_history)

        response = await chat.send_message_async(user_message) # Sử dụng send_message_async cho hàm async
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        # Bạn có thể muốn trả về một thông báo lỗi cụ thể hơn cho client
        # return "Xin lỗi, tôi đang gặp sự cố khi kết nối đến AI. Vui lòng thử lại sau."
        # Hoặc raise một HTTP Exception để FastAPI xử lý
        from fastapi import HTTPException
        raise HTTPException(status_code=503, detail=f"Gemini API error: {str(e)}")

async def get_simple_mock_response(user_message: str, chat_history: list[dict[str, str]]) -> str:
    """
    Hàm giả lập phản hồi nếu không muốn gọi API thật khi phát triển.
    """
    # In ra lịch sử để debug
    # print("Current chat history received by mock:", chat_history)
    # print("User message received by mock:", user_message)
    return f"Đây là phản hồi giả lập cho: '{user_message}'. Số tin nhắn trong lịch sử: {len(chat_history)}"