import { useCallback, useState } from "react";
import { User } from "../types/api/user";

type Props = {
    id: number | null
    users: Array<User>
    onOpen: () => void
}

export const useSelectedUser = ({ id, users }: Props) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const onSelectUser = useCallback((props: Props) => {
        const { id, users, onOpen } = props;
        const targetUser = users.find((user) => user.id === id) || null;
        setSelectedUser(targetUser);
        if (targetUser) {
            onOpen();
        }
    }, [users]);

    return { selectedUser, onSelectUser };
}