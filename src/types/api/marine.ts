export type DivingSpot = {
    name: string
    lat: number
    lon: number
}

export type MarineCurrent = {
    time: string
    interval: number
    wave_height: number | null
    wind_speed_10m: number | null
    sea_surface_temperature: number | null
}

export type MarineResponse = {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current_units: {
        time: string
        interval: string
        wave_height: string
        wind_speed_10m: string
        sea_surface_temperature: string
    }
    current: MarineCurrent
}
