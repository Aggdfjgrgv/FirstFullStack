import { useEffect, useState } from "react"

type Weather = {
    temperature: number
    weather_code: number
    description: string
}

type UseWeatherReturn = {
    weather: Weather | null
    isLoading: boolean
    isError: boolean
}

export const useWeather = (): UseWeatherReturn => {
    const [weather, setWeather] = useState<Weather | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch("/api/weather")
                if (!res.ok) throw new Error("Weather fetch failed")
                const data: Weather = await res.json()
                setWeather(data)
            } catch {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchWeather()
    }, [])

    return { weather, isLoading, isError }
}
