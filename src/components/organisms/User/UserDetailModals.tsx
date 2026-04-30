import { VStack, DialogRoot, DialogBackdrop, DialogPositioner, DialogContent, DialogHeader, DialogTitle, DialogBody, Field, Input, DialogCloseTrigger, Button, DialogFooter } from "@chakra-ui/react";
import { memo, useState, useEffect } from "react";
import { User } from "../../../types/api/user";

// ユーザー詳細モーダルのProps定義
type Props = {
    open: boolean                        // モーダルの開閉状態
    onClose: () => void                  // 閉じるボタンのコールバック
    setOpen: (open: boolean) => void     // ダイアログの開閉制御
    selectedUser: User | null            // 表示対象のユーザー情報
    isAdmin?: boolean                    // 管理者フラグ（編集権限の制御に使用）
}

export const UserDetailModal: React.FC<Props> = memo((props) => {

    const { open, onClose, setOpen, selectedUser, isAdmin } = props

    const [username, setUsername] = useState(selectedUser?.username ?? "")
    const [fullName, setFullName] = useState(selectedUser?.name ?? "")
    const [email, setEmail] = useState(selectedUser?.email ?? "")
    const [phone, setPhone] = useState(selectedUser?.phone ?? "")

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
    const onChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)

    useEffect(() => {
        setUsername(selectedUser?.username ?? "")
        setFullName(selectedUser?.name ?? "")
        setEmail(selectedUser?.email ?? "")
        setPhone(selectedUser?.phone ?? "")
    }, [selectedUser])

    return (
        <>
            <DialogRoot
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
                closeOnInteractOutside={false}
                closeOnEscape={false}
                size="xl"
                motionPreset="slide-in-left"
            >
                <DialogBackdrop bg="blackAlpha.700" />
                <DialogPositioner>
                    <DialogContent
                        bg="#0f2744"
                        border="1px solid #1e3a5f"
                        color="#BEE3F8"
                        padding={8}
                        css={{
                            "&[data-state='open']": {
                                animationDuration: "600ms",  // 開くアニメーション速度
                            },
                            "&[data-state='closed']": {
                                animationDuration: "300ms",  // 閉じるアニメーション速度
                            },
                        }}
                    >
                        <DialogHeader>
                            <DialogTitle color="#90CDF4">ユーザー詳細</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                            <VStack gap="4" align="stretch" >
                                <Field.Root>
                                    <Field.Label color="#63B3ED">名前</Field.Label>
                                    <Input name="name" readOnly={!isAdmin} value={username} onChange={onChangeUsername} bg="#0d1b2e" border="1px solid #2B6CB0" color="#E8F4FD" _placeholder={{ color: "#63B3ED" }} _focus={{ borderColor: "#63B3ED", boxShadow: "0 0 0 1px #63B3ED" }} />
                                    <Field.Label color="#63B3ED">フルネーム</Field.Label>
                                    <Input name="fullName" readOnly={!isAdmin} value={fullName} onChange={onChangeFullName} bg="#0d1b2e" border="1px solid #2B6CB0" color="#E8F4FD" _placeholder={{ color: "#63B3ED" }} _focus={{ borderColor: "#63B3ED", boxShadow: "0 0 0 1px #63B3ED" }} />
                                    <Field.Label color="#63B3ED">メールアドレス</Field.Label>
                                    <Input name="email" readOnly={!isAdmin} value={email} onChange={onChangeEmail} bg="#0d1b2e" border="1px solid #2B6CB0" color="#E8F4FD" _placeholder={{ color: "#63B3ED" }} _focus={{ borderColor: "#63B3ED", boxShadow: "0 0 0 1px #63B3ED" }} />
                                    <Field.Label color="#63B3ED">電話番号</Field.Label>
                                    <Input name="phone" readOnly={!isAdmin} value={phone} onChange={onChangePhone} bg="#0d1b2e" border="1px solid #2B6CB0" color="#E8F4FD" _placeholder={{ color: "#63B3ED" }} _focus={{ borderColor: "#63B3ED", boxShadow: "0 0 0 1px #63B3ED" }} />
                                </Field.Root>
                            </VStack>
                        </DialogBody>
                        <DialogCloseTrigger asChild>
                            <Button position="absolute" top="3" right="3" size="sm" variant="outline" borderColor="#2B6CB0" color="#90CDF4" _hover={{ bg: "#1e3a5f" }}>閉じる</Button>
                        </DialogCloseTrigger>
                        {isAdmin && (
                            <DialogFooter borderTop="1px solid #1e3a5f" mt="4" pt="4">
                                <Button colorScheme="red" size="sm">更新</Button>
                            </DialogFooter>
                        )}
                    </DialogContent>
                </DialogPositioner>
            </DialogRoot>
        </>
    )
})