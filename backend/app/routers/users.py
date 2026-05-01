from fastapi import APIRouter, HTTPException
import httpx
from ..models.user import EchoRequest, UserResponse

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("", response_model=list[UserResponse])
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
