import { useContext } from "react";
import { LoginUserContext, LoginUserContextType } from "../Providers/LoginUserProvider";

export const useLoginUser = () => {
    const { loginUser, setLoginUser } = useContext<LoginUserContextType>(LoginUserContext);
    useContext<LoginUserContextType>(LoginUserContext);

    return { loginUser, setLoginUser };
}