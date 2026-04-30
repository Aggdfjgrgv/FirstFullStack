from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
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


class Geo(BaseModel):
    lat: str
    lng: str


class Address(BaseModel):
    street: str
    suite: str
    city: str
    zipcode: str
    geo: Geo


class Company(BaseModel):
    name: str
    catchPhrase: str
    bs: str


class UserResponse(BaseModel):
    id: int
    name: str
    username: str
    email: str
    address: Address
    phone: str
    website: str
    company: Company


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"message": "FastAPI is running"}


@app.post("/api/echo")
def echo(payload: EchoRequest) -> dict[str, str]:
    return {"echo": payload.text}


@app.get("/api/users", response_model=list[UserResponse])
def get_users() -> list[UserResponse]:
    try:
        response = httpx.get(
            "https://jsonplaceholder.typicode.com/users/",
            timeout=10.0,
        )
        response.raise_for_status()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Failed to fetch users from JsonPlaceholder") from exc

    return response.json()
