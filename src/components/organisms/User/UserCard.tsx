import { Box, VStack, Text } from "@chakra-ui/react";
import { memo } from "react";

// ユーザーカード1枚分のProps定義
type Props = {
    id: number                          // ユーザーID
    imageUrl: string                    // アバター画像URL
    username: string                    // ユーザー名
    fullName: string                    // フルネーム
    onClick?: (id: number) => void      // カードクリック時のコールバック
}

export const UserCard: React.FC<Props> = memo((props) => {

    const { id, imageUrl, username, fullName, onClick } = props

    return (
        // カード全体: ダーク背景＋ホバーでグローエフェクト
        <VStack gap="0" align="stretch">
            <Box
                w="220px"
                bg="#0f2744"                             // ダークネイビー背景
                borderRadius="16px"
                shadow="lg"
                overflow="hidden"
                border="1px solid"
                borderColor="#1e3a5f"
                _hover={{
                    cursor: "pointer",
                    transform: "translateY(-4px)",       // 浮き上がりエフェクト
                    shadow: "0 0 20px rgba(66,153,225,0.4)",  // ブルーグロー
                    borderColor: "#4299E1",
                }}
                transition="all 0.2s ease"
                onClick={() => onClick && onClick(id)}
            >
                {/* アバター画像エリア */}
                <Box bg="#0d1b2e" pt="6" pb="4" textAlign="center">
                    <img
                        src={imageUrl}
                        alt={fullName}
                        onError={(e) => {
                            // 画像読み込み失敗時のフォールバック
                            e.currentTarget.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=160&h=160&q=80";
                        }}
                        style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            margin: "0 auto",
                            display: "block",
                            border: "3px solid #4299E1",  // ブルーリング
                            objectFit: "cover",
                        }}
                    />
                </Box>

                {/* ユーザー情報エリア */}
                <Box p="4" textAlign="center">
                    <Text fontSize="md" fontWeight="bold" color="#90CDF4">
                        {username}
                    </Text>
                    <Text fontSize="sm" color="#63B3ED" mt="1">
                        {fullName}
                    </Text>
                </Box>
            </Box>
        </VStack>
    )
})