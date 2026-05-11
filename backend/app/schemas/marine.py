from pydantic import BaseModel


class DivingSpot(BaseModel):
    name: str
    lat: float
    lon: float


class PrefectureInfo(BaseModel):
    code: str
    name: str


class CurrentUnits(BaseModel):
    time: str
    interval: str
    wave_height: str
    wind_speed_10m: str
    sea_surface_temperature: str


class Current(BaseModel):
    time: str
    interval: int
    wave_height: float | None
    wind_speed_10m: float | None
    sea_surface_temperature: float | None


class MarineResponse(BaseModel):
    latitude: float
    longitude: float
    generationtime_ms: float
    utc_offset_seconds: int
    timezone: str
    timezone_abbreviation: str
    elevation: float
    current_units: CurrentUnits
    current: Current