import { memo, useCallback, useState } from "react"
import { Flex, Heading, Link, Spinner, Text } from "@chakra-ui/react"
import { MenuIconButton } from "../../atoms/button/MenuIconButton"
import { MenuDrawer } from "../../molecule/MenuDrawer"
import { useHistory } from "react-router-dom"
import { useWeather } from "../../../hooks/useWeather"
import { useLoginUser } from "../../../hooks/useLoginUser"

export const Header: React.FC = memo(() => {
    const [isOpen, setIsOpen] = useState(false)
    const history = useHistory()
    const { weather, isLoading, isError } = useWeather()
    const { loginUser } = useLoginUser()

    const onClickHome = useCallback(() => {
        history.push("/home")
    }, [history])

    const onClickUserManagement = useCallback(() => {
        history.push("/home/user_management")
    }, [history])

    const onClickSettings = useCallback(() => {
        history.push("/home/setting")
    }, [history])

    return (
        <>
            {/* ナビゲーションバー: ダークネイビー背景＋ボトムライン */}
            <Flex
                as="nav"
                bg="#0a1628"                          // 最暗ネイビー
                color="#90CDF4"
                justify="space-between"
                align="center"
                padding={{ base: 3, md: 5 }}
                borderBottom="1px solid #1e3a5f"
                boxShadow="0 2px 10px rgba(0,0,0,0.5)"
            >
                {/* ロゴ・タイトル: クリックでホームへ */}
                <Flex
                    align="center"
                    as="a"
                    mr={8}
                    _hover={{ cursor: "pointer", color: "#63B3ED" }}
                    transition="color 0.2s"
                    onClick={onClickHome}
                >
                    <Heading as="h1" fontSize={{ base: "md", md: "lg" }} color="#4299E1" letterSpacing="wider">
                        Home
                    </Heading>
                </Flex>

                {/* デスクトップ用ナビリンク（md以上で表示） */}
                <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }} gap="6">
                    <Link
                        color="#63B3ED"
                        _hover={{ color: "#90CDF4", textDecoration: "none" }}
                        onClick={onClickUserManagement}
                        transition="color 0.2s"
                    >
                        ユーザー一覧
                    </Link>
                    <Link
                        color="#63B3ED"
                        _hover={{ color: "#90CDF4", textDecoration: "none" }}
                        onClick={onClickSettings}
                        transition="color 0.2s"
                    >
                        設定
                    </Link>
                </Flex>

                {/* 天気情報（デスクトップ用） */}
                <Flex
                    align="center"
                    gap="2"
                    display={{ base: "none", md: "flex" }}
                    mr={4}
                    color="#90CDF4"
                    fontSize="sm"
                >
                    {isLoading && <Spinner size="xs" color="#4299E1" />}
                    {isError && <Text color="#FC8181">天気取得失敗</Text>}
                    {weather && !isLoading && (
                        <Text>
                            東京 {weather.description} {weather.temperature}°C
                        </Text>
                    )}
                </Flex>

                {/* ログインユーザー名 */}
                {loginUser && (
                    <Text
                        display={{ base: "none", md: "block" }}
                        color="#90CDF4"
                        fontSize="sm"
                        mr={4}
                    >
                        {loginUser.username}
                    </Text>
                )}

                {/* ハンバーガーメニュー（モバイル用） */}
                <MenuIconButton onClick={() => setIsOpen(true)} />
            </Flex>

            {/* モバイル用ドロワーメニュー */}
            <MenuDrawer
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClickHome={onClickHome}
                onClickUserManagement={onClickUserManagement}
                onClickSettings={onClickSettings}
            />
        </>
    )
})      