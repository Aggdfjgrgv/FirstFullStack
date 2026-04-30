import axios from "axios"
import { useCallback, useState } from "react"
import { User } from "../types/api/user"
import { useMessage } from "./useMessage"

export const useAllUsers = () => {
    const { showMessage } = useMessage()
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<User[]>([])

    const getUsers = useCallback(() => {
        setLoading(true)
        axios.get<User[]>("/api/users")
            .then(response => setUsers(response.data))
            .catch(() => showMessage({ title: "ユーザーの取得に失敗しました", status: "error" }))
            .finally(() => setLoading(false))
    }, [showMessage])

    return { getUsers, loading, users }
}