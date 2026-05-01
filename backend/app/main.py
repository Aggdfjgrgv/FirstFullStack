from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models.user import EchoRequest
from .routers import users, weather

app = FastAPI(title="FirstFullStack API")

# 開発中はフロントエンドのローカルURLを許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(weather.router)


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"message": "FastAPI is running"}


@app.post("/api/echo")
def echo(payload: EchoRequest) -> dict[str, str]:
    return {"echo": payload.text}
