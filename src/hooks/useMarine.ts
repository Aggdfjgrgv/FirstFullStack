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
        let isCancelled = false

        const fetchSpots = async () => {
            setSpotMarineList([])
            setIsSpotsLoading(true)
            try {
                const url = new URL("/api/marine/spots", window.location.origin)
                if (prefecture) {
                    url.searchParams.append("prefecture", prefecture)
                }
                const res = await fetch(url.toString())
                if (!res.ok) throw new Error("Failed to fetch spots")
                const data: SpotsMap = await res.json()
                if (!isCancelled) {
                    setSpots(data)
                }
            } catch {
                if (!isCancelled) {
                    setSpots({})
                }
            } finally {
                if (!isCancelled) {
                    setIsSpotsLoading(false)
                }
            }
        }

        void fetchSpots()

        return () => {
            isCancelled = true
        }
    }, [prefecture])

    useEffect(() => {
        let isCancelled = false

        if (Object.keys(spots).length === 0) {
            return
        }

        const fetchAll = async () => {
            const initial: SpotMarine[] = Object.entries(spots).map(([key, spot]) => ({
                spotKey: key,
                spotName: spot.name,
                data: null,
                isLoading: true,
                isError: false,
            }))
            setSpotMarineList(initial)

            Object.entries(spots).forEach(([key]) => {
                void (async () => {
                    try {
                        const res = await fetch(`/api/marine/info?spot=${encodeURIComponent(key)}`)
                        if (!res.ok) throw new Error("Failed")
                        const data: MarineResponse = await res.json()

                        if (isCancelled) return
                        setSpotMarineList((prev) =>
                            prev.map((item) =>
                                item.spotKey === key
                                    ? { ...item, data, isLoading: false, isError: false }
                                    : item
                            )
                        )
                    } catch {
                        if (isCancelled) return
                        setSpotMarineList((prev) =>
                            prev.map((item) =>
                                item.spotKey === key
                                    ? { ...item, data: null, isLoading: false, isError: true }
                                    : item
                            )
                        )
                    }
                })()
            })
        }

        void fetchAll()

        return () => {
            isCancelled = true
        }
    }, [spots])

    return { spotMarineList, isSpotsLoading }
}
