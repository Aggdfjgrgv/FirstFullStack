import { Box, Button, Flex, Heading, Input, Separator, Stack, } from "@chakra-ui/react";
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
        <Flex align="center" justify="center" height="100vh">
            {/* ログインカード: ダークネイビー背景＋ブルーボーダー */}
            <Box
                bg="#0f2744"
                w="sm"
                p={8}
                borderRadius="xl"
                boxShadow="0 0 30px rgba(66,153,225,0.2)"
                border="1px solid #2B6CB0"
            >
                {/* タイトル */}
                <Heading as="h1" fontSize={{ base: "md", md: "xl" }} textAlign="center" mb={4} color="#90CDF4" letterSpacing="wider">
                    USER MANAGER
                </Heading>
                <Separator my={4} borderColor="#1e3a5f" />
                <Stack my={6} px={4} gap={4}>
                    {/* ユーザーID入力欄 */}
                    <Input
                        placeholder="ユーザーID"
                        value={userId}
                        onChange={onChangeUserId}
                        bg="#0d1b2e"
                        border="1px solid #2B6CB0"
                        color="#BEE3F8"
                        _placeholder={{ color: "#4299E1" }}
                        _focus={{ borderColor: "#63B3ED", boxShadow: "0 0 0 1px #63B3ED" }}
                    />
                </Stack>
                <PrimaryButton onClick={onClickLogin} isLoading={loading} disabled={userId === ""}>ログイン</PrimaryButton>
            </Box>
        </Flex>
    )
})