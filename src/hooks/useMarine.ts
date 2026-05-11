import { useEffect, useState } from "react"
import { DivingSpot, MarineResponse } from "../types/api/marine"

type SpotsMap = Record<string, DivingSpot>

type SpotMarine = {
    spotKey: string
    spotName: string
    data: MarineResponse | null
    isLoading: boolean
    isError: boolean
}

interface UseMarineProps {
    prefecture?: string | null
}

export const useMarine = ({ prefecture }: UseMarineProps = {}) => {
    const [spots, setSpots] = useState<SpotsMap>({})
    const [spotMarineList, setSpotMarineList] = useState<SpotMarine[]>([])
    const [isSpotsLoading, setIsSpotsLoading] = useState(true)

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const url = new URL("/api/marine/spots", window.location.origin)
                if (prefecture) {
                    url.searchParams.append("prefecture", prefecture)
                }
                const res = await fetch(url.toString())
                if (!res.ok) throw new Error("Failed to fetch spots")
                const data: SpotsMap = await res.json()
                setSpots(data)
            } catch {
                setIsSpotsLoading(false)
            } finally {
                setIsSpotsLoading(false)
            }
        }

        void fetchSpots()
    }, [prefecture])

    useEffect(() => {
        if (Object.keys(spots).length === 0) return

        const fetchAll = async () => {
            const initial: SpotMarine[] = Object.entries(spots).map(([key, spot]) => ({
                spotKey: key,
                spotName: spot.name,
                data: null,
                isLoading: true,
                isError: false,
            }))
            setSpotMarineList(initial)

            const results = await Promise.all(
                Object.entries(spots).map(async ([key, spot]) => {
                    try {
                        const res = await fetch(`/api/marine/info?spot=${key}`)
                        if (!res.ok) throw new Error("Failed")
                        const data: MarineResponse = await res.json()
                        return { spotKey: key, spotName: spot.name, data, isLoading: false, isError: false }
                    } catch {
                        return { spotKey: key, spotName: spot.name, data: null, isLoading: false, isError: true }
                    }
                })
            )
            setSpotMarineList(results)
        }

        void fetchAll()
    }, [spots])

    return { spotMarineList, isSpotsLoading }
}
