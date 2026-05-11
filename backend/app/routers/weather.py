from fastapi import APIRouter, HTTPException
import httpx
from ..schemas.weather import WeatherResponse

router = APIRouter(prefix="/api/weather", tags=["weather"])


def _weather_description(code: int) -> str:
    """WMO weather code を日本語の説明に変換する"""
    if code == 0:
        return "快晴"
    elif code in (1, 2):
        return "晴れ"
    elif code == 3:
        return "曇り"
    elif code in (45, 48):
        return "霧"
    elif code in (51, 53, 55):
        return "霧雨"
    elif code in (61, 63, 65):
        return "雨"
    elif code in (71, 73, 75, 77):
        return "雪"
    elif code in (80, 81, 82):
        return "にわか雨"
    elif code in (95, 96, 99):
        return "雷雨"
    else:
        return "不明"


@router.get("", response_model=WeatherResponse)
def get_weather() -> WeatherResponse:
    """東京の現在の気象情報を Open-Meteo から取得する"""
    try:
        response = httpx.get(
            "https://api.open-meteo.com/v1/forecast",
            params={
                "latitude": 35.6895,
                "longitude": 139.6917,
                "current": "temperature_2m,weather_code",
                "timezone": "Asia/Tokyo",
            },
            timeout=10.0,
        )
        response.raise_for_status()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Failed to fetch weather data") from exc

    data = response.json()
    current = data["current"]
    weather_code = int(current["weather_code"])

    return WeatherResponse(
        temperature=current["temperature_2m"],
        weather_code=weather_code,
        description=_weather_description(weather_code),
    )
