import { memo } from "react";

import { IconButton, Box, Link, Flex } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";

type Props = {
    onClick: () => void
}

export const MenuIconButton: React.FC<Props> = memo((props) => {

    const { onClick } = props
    return (
        <IconButton aria-label="メニューボタン"
            size="sm"
            variant="ghost"
            color="white"
            display={{ base: "block", md: "none" }}
            onClick={onClick}><MdMenu />
        </IconButton>
    )
})