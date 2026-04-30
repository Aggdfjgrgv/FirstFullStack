import axios from "axios"
import { useCallback, useState } from "react"
import { User } from "../types/api/user"
import { useHistory } from "react-router-dom"
import { toaster } from "../components/ui/toaster"
import { useMessage } from "./useMessage"
import { useLoginUser } from "./useLoginUser"


export const useAuth = () => {
    const history = useHistory()
    const { showMessage } = useMessage()
    const { setLoginUser } = useLoginUser()

    const [loading, setLoading] = useState(false)
    const login = useCallback((userId: string) => {
        setLoading(true)
        axios.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`).then((res) => {
            if (res.data) {
                const isAdmin = res.data.id === 10 ? true : false
                setLoginUser({ ...res.data, isAdmin })
                showMessage({ title: "ログインしました", status: "success" })
                history.push("/home")
            } else {
                showMessage({ title: "ユーザーが見つかりませんでした", status: "error" })
            }
        }).catch(() => {
            showMessage({ title: "ログインできませんでした", status: "error" })
        }).finally(() => {
            setLoading(false)
        })
    }, [history, showMessage, setLoginUser])

    return { login, loading }
}
