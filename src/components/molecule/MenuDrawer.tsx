import { memo } from "react";
import { DrawerRoot, DrawerBackdrop, DrawerContent, DrawerBody, Button } from "@chakra-ui/react"

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onClickHome?: () => void
    onClickUserManagement?: () => void
    onClickSettings?: () => void
}

export const MenuDrawer: React.FC<Props> = memo((props) => {
    const { isOpen, setIsOpen, onClickHome, onClickUserManagement, onClickSettings } = props
    return (
        <DrawerRoot placement="start" open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <DrawerBackdrop />
            <DrawerContent>
                <DrawerBody p={0} bg="gray.100">
                    <Button w="100%" onClick={onClickHome}>TOP</Button>
                    <Button w="100%" onClick={onClickUserManagement}>ユーザー一覧</Button>
                    <Button w="100%" onClick={onClickSettings}>設定</Button>
                </DrawerBody>
            </DrawerContent>
        </DrawerRoot>
    )
})