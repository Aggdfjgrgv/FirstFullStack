import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { memo } from "react";
import { useHistory } from "react-router-dom";

export const Page404: React.FC = memo(() => {
    const history = useHistory();

    return (
        <Box
            minH="100vh"
            bgGradient="to-b"
            gradientFrom="cyan.100"
            gradientTo="blue.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={8}
        >
            <VStack gap={6} textAlign="center">
                <Text fontSize="6xl" fontWeight="black" color="cyan.900">
                    404
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="cyan.800">
                    ページが見つかりません
                </Text>
                <Text fontSize="md" color="cyan.700">
                    お探しのページは存在しません
                </Text>
                <Button
                    colorPalette="cyan"
                    size="lg"
                    rounded="full"
                    onClick={() => history.push("/home")}
                >
                    ホームに戻る
                </Button>
            </VStack>
        </Box>
    )
})