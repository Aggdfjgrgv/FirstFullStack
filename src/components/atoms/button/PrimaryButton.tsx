import { memo } from "react";

import { Button } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";

type Props = {
    children: React.ReactNode
    onClick?: () => void
    isLoading?: boolean
    disabled?: boolean
}

export const PrimaryButton: React.FC<Props> = memo((props) => {

    const { children, onClick, isLoading = false, disabled = false } = props
    return (
        <Button bg="blue.500" color="white" _hover={{ bg: "blue.600" }} onClick={onClick} disabled={disabled} loading={isLoading}>
            {children}
        </Button>

    )
})