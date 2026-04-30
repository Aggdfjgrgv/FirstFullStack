import { useCallback } from "react"
import { toaster } from "../components/ui/toaster"

type Props = {
    title: string
    status: "success" | "error" | "warning" | "info"
}

export const useMessage = () => {
    const showMessage = useCallback(({ title, status }: Props) => {
        toaster.create({
            title,
            type: status,
            duration: 3000,
            closable: true,
        })
    }, [toaster])

    return { showMessage }
}