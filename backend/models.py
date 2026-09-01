from pydantic import BaseModel


class GeminiPingResponse(BaseModel):
    message: str
    status: str = "success"
