import { Box, Card, Spinner, Text, VStack, HStack } from "@chakra-ui/react"
import { memo } from "react"
import { MarineResponse } from "../../../types/api/marine"

type Props = {
    spotName: string
    data: MarineResponse | null
    isLoading: boolean
    isError: boolean
}

const getWaveColor = (height: number | null): string => {
    if (height === null || height === undefined) return "blue.700"
    if (height < 0.5) return "cyan.600"
    if (height < 1.0) return "blue.600"
    if (height < 1.5) return "blue.700"
    return "blue.800"
}

const getTemperatureColor = (temp: number | null): string => {
    if (temp === null || temp === undefined) return "blue.700"
    if (temp < 15) return "blue.800"
    if (temp < 18) return "blue.700"
    if (temp < 20) return "cyan.600"
    if (temp < 23) return "cyan.700"
    return "blue.600"
}

export const SpotCard: React.FC<Props> = memo(({ spotName, data, isLoading, isError }) => {
    return (
        <Card.Root
            width="300px"
            bgGradient="to-br"
            gradientFrom="cyan.50"
            gradientTo="blue.50"
            borderWidth="2px"
            borderColor="cyan.300"
            rounded="lg"
            boxShadow="0 4px 12px rgba(0, 188, 212, 0.2)"
            transition="all 0.3s"
            _hover={{
                boxShadow: "0 8px 20px rgba(0, 188, 212, 0.4)",
                transform: "translateY(-4px)",
                borderColor: "cyan.400"
            }}
        >
            <Card.Body gap={4}>
                <VStack align="start" gap={3} w="full">
                    <Text fontWeight="bold" fontSize="lg" color="cyan.900">
                        📍 {spotName}
                    </Text>

                    {isLoading && (
                        <Box display="flex" justifyContent="center" w="full" py={4}>
                            <Spinner size="md" color="cyan.600" />
                        </Box>
                    )}
                    {isError && (
                        <Text color="red.600" fontSize="sm" fontWeight="semibold">⚠️ 情報取得に失敗しました</Text>
                    )}

                    {data && (
                        <>
                            <Box borderTop="1px solid" borderColor="cyan.200" w="full" />

                            <VStack align="start" gap={3} w="full" fontSize="sm">
                                {/* 水温 */}
                                <HStack justify="space-between" w="full">
                                    <HStack gap={2}>
                                        <Text color="cyan.700" fontWeight="semibold">🌡 水温</Text>
                                    </HStack>
                                    <Box
                                        px={3}
                                        py={1}
                                        bg={getTemperatureColor(data.current.sea_surface_temperature)}
                                        rounded="full"
                                        color="white"
                                        fontWeight="bold"
                                        fontSize="sm"
                                    >
                                        {data.current.sea_surface_temperature ?? "—"} °C
                                    </Box>
                                </HStack>

                                {/* 波高 */}
                                <HStack justify="space-between" w="full">
                                    <HStack gap={2}>
                                        <Text color="cyan.700" fontWeight="semibold">🌊 波高</Text>
                                    </HStack>
                                    <Box
                                        px={3}
                                        py={1}
                                        bg={getWaveColor(data.current.wave_height)}
                                        rounded="full"
                                        color="white"
                                        fontWeight="bold"
                                        fontSize="sm"
                                    >
                                        {data.current.wave_height ?? "—"} m
                                    </Box>
                                </HStack>

                                {/* 風速 */}
                                <HStack justify="space-between" w="full">
                                    <HStack gap={2}>
                                        <Text color="cyan.700" fontWeight="semibold">💨 風速</Text>
                                    </HStack>
                                    <Text color="cyan.700" fontWeight="bold">
                                        {data.current.wind_speed_10m ?? "—"} m/s
                                    </Text>
                                </HStack>
                            </VStack>

                            <Box borderTop="1px solid" borderColor="cyan.200" w="full" />
                            <Text color="gray.500" fontSize="xs" w="full" textAlign="right">
                                更新: {data.current.time}
                            </Text>
                        </>
                    )}
                </VStack>
            </Card.Body>
        </Card.Root>
    )
})
