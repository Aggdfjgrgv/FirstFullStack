import { Box, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { memo, useState } from "react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

export const Login: React.FC = memo(() => {
    const [userId, setUserId] = useState("");
    const { login, loading } = useAuth();

    const onChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)


    const onClickLogin = () => {
        login(userId)
    }

    return (
        <Flex
            align="center"
            justify="center"
            height="100vh"
            bgGradient="to-br"
            gradientFrom="cyan.100"
            gradientTo="blue.100"
        >
            {/* ログインカード: 海のテーマで統一 */}
            <Box
                bg="white"
                w="sm"
                p={8}
                borderRadius="xl"
                boxShadow="0 8px 32px rgba(0, 188, 212, 0.3)"
                borderWidth="2px"
                borderColor="cyan.300"
            >
                {/* タイトル */}
                <Heading
                    as="h1"
                    fontSize={{ base: "md", md: "2xl" }}
                    textAlign="center"
                    mb={2}
                    color="cyan.900"
                    letterSpacing="wider"
                >
                    🌊 USER MANAGER
                </Heading>
                <Text fontSize="sm" textAlign="center" color="cyan.700" mb={6}>
                    ダイビングスポット管理システム
                </Text>
                <Box borderTop="2px solid" borderColor="cyan.200" mb={6} />
                <Stack my={6} px={4} gap={4}>
                    {/* ユーザーID入力欄 */}
                    <Input
                        placeholder="ユーザーID"
                        value={userId}
                        onChange={onChangeUserId}
                        bg="cyan.50"
                        borderWidth="2px"
                        borderColor="cyan.300"
                        color="cyan.900"
                        _placeholder={{ color: "cyan.400" }}
                        _focus={{
                            borderColor: "cyan.500",
                            boxShadow: "0 0 0 1px rgba(0, 188, 212, 0.5)",
                            bg: "white"
                        }}
                        fontWeight="semibold"
                    />
                </Stack>
                <PrimaryButton onClick={onClickLogin} isLoading={loading} disabled={userId === ""}>
                    ログイン
                </PrimaryButton>
            </Box>
        </Flex>
    )
})