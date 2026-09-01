import os
import google.generativeai as genai


class GeminiClient:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-pro")

    def ping(self):
        """Send a hardcoded prompt to Gemini API and return the response."""
        prompt = "Say hello and confirm the Gemini API connection is working."
        response = self.model.generate_content(prompt)
        return response.text
