// import { VStack, Wrap, WrapItem, Spinner, Center, DialogRoot, DialogContent, DialogBackdrop, DialogPositioner, DialogHeader, DialogTitle, DialogCloseTrigger, Button, DialogBody, Field, Input, Box, Text } from "@chakra-ui/react";
import { VStack, Wrap, WrapItem, Spinner, Center, Box, Text } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState } from "react";
import { UserCard } from "../organisms/User/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/User/UserDetailModals";
import { useSelectedUser } from "../../hooks/useSelectedUser";
import { useLoginUser } from "../../hooks/useLoginUser"

export const UserManagement: React.FC = memo(() => {
    const { getUsers, users, loading } = useAllUsers();
    const [open, setOpen] = useState(false);
    const { selectedUser, onSelectUser } = useSelectedUser({ id: null, users, onOpen: () => setOpen(true) });
    const { loginUser } = useLoginUser()

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const onClickUser = useCallback((id: number) => {
        onSelectUser({ id, users, onOpen: () => setOpen(true) });
        console.log("ユーザーID:", id);
    }, [onSelectUser, users]);

    return (
        <Box
            minH="100vh"
            bgGradient="to-b"
            gradientFrom="cyan.100"
            gradientTo="blue.100"
            p={8}
        >
            {/* ローディング中はスピナーを画面中央に表示 */}
            {loading ? (
                <Center h="100vh">
                    <Spinner size="xl" color="cyan.600" />
                </Center>
            ) : (

                <VStack align="start" gap={6} w="full">
                    <Box w="full" pb={4} borderBottom="3px solid" borderColor="cyan.400">
                        <Text fontSize="3xl" fontWeight="black" color="cyan.900">
                            👥 ユーザー管理
                        </Text>
                        <Text fontSize="sm" color="cyan.700" fontWeight="semibold" mt={2}>登録ユーザー一覧</Text>
                    </Box>

                    {/* ユーザーカード一覧 */}
                    <Wrap gap="6" w="full">
                        {users.map((user) => (
                            <WrapItem key={user.id}>
                                <UserCard
                                    id={user.id}
                                    imageUrl={"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=260&h=260&q=80"}
                                    username={user.username}
                                    fullName={user.name}
                                    onClick={onClickUser}>
                                </UserCard>
                            </WrapItem>
                        ))}
                    </Wrap>
                    <UserDetailModal
                        open={open}
                        onClose={() => setOpen(false)}
                        setOpen={setOpen}
                        selectedUser={selectedUser}
                        isAdmin={loginUser?.isAdmin}
                    />
                </VStack>
            )
            }
        </Box>
    )
})