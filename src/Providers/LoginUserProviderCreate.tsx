import { createContext } from 'react';

import { LoginUserContextType } from './LoginUserProvider';

export const LoginUserContext = createContext<LoginUserContextType>(
    {} as LoginUserContextType
);