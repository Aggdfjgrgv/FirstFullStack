from fastapi import APIRouter, Depends, HTTPException
import httpx
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models.marine_entities import Prefecture, Spot
from ..schemas.marine import DivingSpot, MarineResponse, PrefectureInfo

router = APIRouter(prefix="/api/marine", tags=["marine"])


def _to_diving_spot_dict(spots: list[Spot]) -> dict[str, DivingSpot]:
    return {
        spot.key: DivingSpot(name=spot.name, lat=spot.lat, lon=spot.lon)
        for spot in spots
    }


@router.get("/prefectures", response_model=list[PrefectureInfo])
def get_prefectures(db: Session = Depends(get_db)) -> list[PrefectureInfo]:
    rows = db.scalars(select(Prefecture).order_by(Prefecture.id.asc())).all()

    return [PrefectureInfo(code=row.code, name=row.name) for row in rows]


@router.get("/spots")
def get_spots(
    prefecture: str | None = None,
    q: str | None = None,
    db: Session = Depends(get_db),
) -> dict[str, DivingSpot]:
    stmt = (
        select(Spot)
        .join(Prefecture, Spot.prefecture_id == Prefecture.id)
        .where(Spot.is_active.is_(True))
        .order_by(Spot.id.asc())
    )

    if prefecture:
        stmt = stmt.where(
            or_(
                Prefecture.code == prefecture,
                Prefecture.name == prefecture,
            )
        )

    if q:
        stmt = stmt.where(Spot.name.contains(q))

    spots = db.scalars(stmt).all()

    return _to_diving_spot_dict(spots)


@router.get("/info", response_model=MarineResponse)
def get_marine_info(
    spot: str = "okinawa_kerama",
    db: Session = Depends(get_db),
) -> MarineResponse:
    diving_spot = db.scalar(
        select(Spot)
        .where(Spot.key == spot)
        .where(Spot.is_active.is_(True))
        .limit(1)
    )

    if diving_spot is None:
        raise HTTPException(status_code=404, detail=f"Spot '{spot}' not found. Use GET /api/marine/spots to see available spots.")

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