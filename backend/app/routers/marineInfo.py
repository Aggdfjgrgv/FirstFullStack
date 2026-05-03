from fastapi import APIRouter, HTTPException
import httpx
from ..models.marineInfo import MarineResponse, DivingSpot

router = APIRouter(prefix="/api/marine", tags=["marine"])

DIVING_SPOTS: dict[str, DivingSpot] = {
    "okinawa_kerama": DivingSpot(name="慶良間諸島（沖縄）", lat=26.1667, lon=127.2833),
    "okinawa_iriomote": DivingSpot(name="西表島（沖縄）", lat=24.3167, lon=123.8667),
    "okinawa_ishigaki": DivingSpot(name="石垣島（沖縄）", lat=24.3333, lon=124.1333),
    "izu_osezaki": DivingSpot(name="大瀬崎（伊豆）", lat=35.0333, lon=138.7833),
    "izu_futo": DivingSpot(name="富戸（伊豆）", lat=34.9167, lon=139.1333),
    "izu_yawatano": DivingSpot(name="八幡野（伊豆）", lat=34.8833, lon=139.1167),
    "ogasawara": DivingSpot(name="小笠原諸島", lat=27.0833, lon=142.1833),
    "yakushima": DivingSpot(name="屋久島（鹿児島）", lat=30.3667, lon=130.6500),
    "amami": DivingSpot(name="奄美大島（鹿児島）", lat=28.3667, lon=129.5000),
}


@router.get("/spots")
def get_spots() -> dict[str, DivingSpot]:
    return DIVING_SPOTS


@router.get("/info", response_model=MarineResponse)
def get_marine_info(spot: str = "okinawa_kerama") -> MarineResponse:
    if spot not in DIVING_SPOTS:
        raise HTTPException(status_code=404, detail=f"Spot '{spot}' not found. Use GET /api/marine/spots to see available spots.")

    diving_spot = DIVING_SPOTS[spot]

    try:
        response = httpx.get(
            "https://marine-api.open-meteo.com/v1/marine",
            params={
                "latitude": diving_spot.lat,
                "longitude": diving_spot.lon,
                "current": "wave_height,wind_speed_10m,sea_surface_temperature",
            },
            timeout=10.0,
        )
        response.raise_for_status()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Failed to fetch marine info") from exc

    return MarineResponse(**response.json())