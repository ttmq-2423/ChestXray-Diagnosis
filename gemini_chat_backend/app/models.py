from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    history: list[dict[str, str]] = [] # Lịch sử chat: [{"role": "user", "parts": ["text"]}, {"role": "model", "parts": ["text"]}]

class ChatResponse(BaseModel):
    reply: str