from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="FirstFullStack API")

# 開発中はフロントエンドのローカルURLを許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EchoRequest(BaseModel):
    text: str


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"message": "FastAPI is running"}


@app.post("/api/echo")
def echo(payload: EchoRequest) -> dict[str, str]:
    return {"echo": payload.text}
