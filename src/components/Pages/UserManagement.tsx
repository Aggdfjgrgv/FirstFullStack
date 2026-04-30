import { VStack, Wrap, WrapItem, Spinner, Center, DialogRoot, DialogContent, DialogBackdrop, DialogPositioner, DialogHeader, DialogTitle, DialogCloseTrigger, Button, DialogBody, Field, Input } from "@chakra-ui/react";
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
    }, []);

    const onClickUser = useCallback((id: number) => {
        onSelectUser({ id, users, onOpen: () => setOpen(true) });
        console.log("ユーザーID:", id);
    }, [onSelectUser, users]);

    return (
        <>
            {/* ローディング中はスピナーを画面中央に表示 */}
            {loading ? (
                <Center h="100vh">
                    <Spinner size="xl" color="blue.300" />
                </Center>
            ) : (
                <>
                    {/* ユーザーカード一覧 */}
                    <Wrap p={{ base: "4", md: "10" }} gap="6">
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
                </>
            )
            }
        </>
    )
})