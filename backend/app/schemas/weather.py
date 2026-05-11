from pydantic import BaseModel


class WeatherResponse(BaseModel):
    temperature: float
    weather_code: int
    description: str