import { memo, useCallback, useState } from "react"
import { Box, Flex, Heading, Link, IconButton, DrawerRoot, DrawerBackdrop, DrawerContent, DrawerBody, Button } from "@chakra-ui/react"
import { MdMenu } from "react-icons/md"
import { MenuIconButton } from "../../atoms/button/MenuIconButton"
import { MenuDrawer } from "../../molecule/MenuDrawer"
import { useHistory } from "react-router-dom"

export const Header: React.FC = memo(() => {
    const [isOpen, setIsOpen] = useState(false)
    const history = useHistory()

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
                        USER MANAGER
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