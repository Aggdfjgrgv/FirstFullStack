import { createContext, useState } from "react";

import { User } from "../types/api/user";

type LoginUser = User & { isAdmin: boolean } | null

export type LoginUserContextType = {
    loginUser: LoginUser
    setLoginUser: React.Dispatch<React.SetStateAction<LoginUser>>
}

export const LoginUserContext = createContext<LoginUserContextType>(
    {} as LoginUserContextType
);

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
