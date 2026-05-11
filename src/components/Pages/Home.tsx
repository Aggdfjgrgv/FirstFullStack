import { Alert, Box, Button, HStack, Spinner, Text, VStack, Wrap } from "@chakra-ui/react";
import axios from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { useMarine } from "../../hooks/useMarine";
import { SpotCard } from "../organisms/Marine/SpotCard";

interface Prefecture {
    code: string
    name: string
}

export const Home: React.FC = memo(() => {
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
    const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);
    const { spotMarineList, isSpotsLoading } = useMarine({ prefecture: selectedPrefecture });

    const fetchHealth = useCallback(async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.get<{ message: string }>("/api/health");
            setMessage(response.data.message);
        } catch {
            setError("FastAPIへの接続に失敗しました。バックエンドが起動しているか確認してください。");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchPrefectures = useCallback(async () => {
        try {
            const response = await axios.get<Prefecture[]>("/api/marine/prefectures");
            setPrefectures(response.data);
        } catch {
            setError("県情報の取得に失敗しました。");
        }
    }, []);

    useEffect(() => {
        void fetchHealth();
        void fetchPrefectures();
    }, [fetchHealth, fetchPrefectures]);

    return (
        <Box
            minH="100vh"
            bgGradient="to-b"
            gradientFrom="cyan.100"
            gradientTo="blue.100"
            p={8}
        >
            <VStack align="start" gap={8} w="full">
                <Box w="full" pb={4} borderBottom="3px solid" borderColor="cyan.400">
                    <Text fontSize="4xl" fontWeight="black" color="cyan.900" mb={2}>
                        🌊 ダイビングスポット海況情報
                    </Text>
                    <Text fontSize="sm" color="cyan.700" fontWeight="semibold">全国のダイビングスポットの波高、水温、風速をリアルタイムでチェック</Text>
                </Box>

                <HStack gap={3}>
                    <Button
                        colorPalette="cyan"
                        onClick={() => void fetchHealth()}
                        disabled={isLoading}
                        size="lg"
                        rounded="full"
                    >
                        {isLoading ? "接続中..." : "接続確認"}
                    </Button>
                    {isLoading && <Spinner size="sm" color="cyan.600" />}
                    <select
                        value={selectedPrefecture || ""}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedPrefecture(e.target.value || null)}
                        style={{
                            padding: "8px 12px",
                            fontSize: "16px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            minWidth: "200px"
                        }}
                    >
                        <option value="">全国</option>
                        {prefectures.map((pref) => (
                            <option key={pref.code} value={pref.code}>
                                {pref.name}
                            </option>
                        ))}
                    </select>
                </HStack>

                {message && (
                    <Alert.Root status="success" w="full" rounded="lg">
                        <Alert.Indicator />
                        <Alert.Content>
                            <Text color="green.700" fontWeight="semibold">{message}</Text>
                        </Alert.Content>
                    </Alert.Root>
                )}
                {error && (
                    <Alert.Root status="error" w="full" rounded="lg">
                        <Alert.Indicator />
                        <Alert.Content>
                            <Text color="red.700" fontWeight="semibold">{error}</Text>
                        </Alert.Content>
                    </Alert.Root>
                )}

                {isSpotsLoading ? (
                    <Box display="flex" justifyContent="center" w="full" py={8}>
                        <Spinner size="xl" color="cyan.600" />
                    </Box>
                ) : (
                    <Wrap gap={6} w="full" justify="start">
                        {spotMarineList.map((spot) => (
                            <SpotCard
                                key={spot.spotKey}
                                spotName={spot.spotName}
                                data={spot.data}
                                isLoading={spot.isLoading}
                                isError={spot.isError}
                            />
                        ))}
                    </Wrap>
                )}
            </VStack>
        </Box>
    )
})