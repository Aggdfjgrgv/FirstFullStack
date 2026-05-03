import { Box, VStack, Text } from "@chakra-ui/react";
import { memo } from "react";

export const Setting: React.FC = memo(() => {
    return (
        <Box
            minH="100vh"
            bgGradient="to-b"
            gradientFrom="cyan.100"
            gradientTo="blue.100"
            p={8}
        >
            <VStack align="start" gap={6} w="full">
                <Box w="full" pb={4} borderBottom="3px solid" borderColor="cyan.400">
                    <Text fontSize="3xl" fontWeight="black" color="cyan.900">
                        ⚙️ 設定
                    </Text>
                    <Text fontSize="sm" color="cyan.700" fontWeight="semibold" mt={2}>アプリケーション設定</Text>
                </Box>

                <Box bg="white" p={6} rounded="lg" borderWidth="1px" borderColor="cyan.200" w="full" boxShadow="0 2px 8px rgba(0, 188, 212, 0.1)">
                    <Text color="gray.600" fontSize="md">設定項目は準備中です</Text>
                </Box>
            </VStack>
        </Box>
    )
})