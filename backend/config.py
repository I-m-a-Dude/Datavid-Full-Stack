from pydantic_settings import BaseSettings
from typing import Optional
import os
from pathlib import Path

# Get the directory where this config.py file is located
BASE_DIR = Path(__file__).resolve().parent


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./members.db"
    MISTRAL_API_KEY: Optional[str] = None

    class Config:
        env_file = str(BASE_DIR / ".env")
        env_file_encoding = 'utf-8'
        case_sensitive = True
        extra = 'ignore'


settings = Settings()

# Debug: Print to verify the API key is loaded (remove this in production)
if __name__ == "__main__":
    print(f"Looking for .env at: {BASE_DIR / '.env'}")
    print(f".env exists: {(BASE_DIR / '.env').exists()}")
    print(f"MISTRAL_API_KEY loaded: {'Yes' if settings.MISTRAL_API_KEY else 'No'}")
    if settings.MISTRAL_API_KEY:
        print(f"API Key (first 10 chars): {settings.MISTRAL_API_KEY[:10]}...")