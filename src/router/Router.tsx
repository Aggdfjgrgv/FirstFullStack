import { Route, Switch } from "react-router-dom"
import { memo } from "react"

import { Login } from "../components/Pages/Login"
import { homeRoutes } from "./HomeRoutes"
import { Page404 } from "../components/Pages/Page404"
import { HeaderLayout } from "../components/template/HeaderLayout"
import { LoginUserProvider } from "../Providers/LoginUserProvider"

export const Router: React.FC = memo(() => {
    return (
        <LoginUserProvider>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/home" render={({ match: { url } }) => (
                    console.log(url),
                    <Switch>
                        {homeRoutes.map((route) => (
                            <Route key={route.path} path={`${url}${route.path}`} exact={route.exact}>
                                <HeaderLayout>
                                    {route.Children}
                                </HeaderLayout>
                            </Route>
                        ))}
                    </Switch>
                )
                } />
                < Route path="*" >
                    <Page404 />
                </Route >
            </Switch >
        </LoginUserProvider>
    )
})