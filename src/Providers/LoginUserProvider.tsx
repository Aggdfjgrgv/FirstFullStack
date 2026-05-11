import { useState } from "react";

import { User } from "../types/api/user";
import { LoginUserContext } from "./LoginUserProviderCreate";

type LoginUser = User & { isAdmin: boolean } | null

export type LoginUserContextType = {
    loginUser: LoginUser
    setLoginUser: React.Dispatch<React.SetStateAction<LoginUser>>
}

const LoginUserProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const [loginUser, setLoginUser] = useState<LoginUser>(null);

    return (
        <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </LoginUserContext.Provider>
    );
};

export { LoginUserProvider };
export default LoginUserContext;
