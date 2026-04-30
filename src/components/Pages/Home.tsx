import { Alert, Box, Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { memo, useCallback, useEffect, useState } from "react";

export const Home: React.FC = memo(() => {
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

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

    useEffect(() => {
        void fetchHealth();
    }, [fetchHealth]);

    return (
        <Box p={6}>
            <VStack align="start" gap={4}>
                <Text fontSize="2xl" fontWeight="bold">ホームページ</Text>
                <Text>
                    この画面は、ReactからFastAPIの`/api/health`を呼び出して接続確認するための学習用サンプルです。
                </Text>

                <HStack gap={3}>
                    <Button colorPalette="blue" onClick={() => void fetchHealth()} disabled={isLoading}>
                        再取得
                    </Button>
                    {isLoading && <Spinner size="sm" />}
                </HStack>

                {message && <Alert.Root status="success"><Alert.Indicator /><Alert.Content>{message}</Alert.Content></Alert.Root>}
                {error && <Alert.Root status="error"><Alert.Indicator /><Alert.Content>{error}</Alert.Content></Alert.Root>}
            </VStack>
        </Box>
    )
})