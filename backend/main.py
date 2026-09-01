from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models import GeminiPingResponse
from services.gemini_client import GeminiClient

load_dotenv()

app = FastAPI(title="Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/ping-gemini", response_model=GeminiPingResponse)
def ping_gemini():
    """Test endpoint: sends a hardcoded prompt to Gemini API and returns response."""
    try:
        client = GeminiClient()
        message = client.ping()
        return GeminiPingResponse(message=message, status="success")
    except Exception as e:
        return GeminiPingResponse(
            message=f"Error: {str(e)}", status="error"
        )


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}
