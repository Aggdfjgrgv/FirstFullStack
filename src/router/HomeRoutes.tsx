import { Home } from "../components/Pages/Home";
import { UserManagement } from "../components/Pages/UserManagement";
import { Setting } from "../components/Pages/Setting";
import { Page404 } from "../components/Pages/Page404";

export const homeRoutes = [
    {
        path: "/",
        exact: true,
        Children: <Home />
    },
    {
        path: "/user_management",
        exact: false,
        Children: <UserManagement />
    },
    {
        path: "/setting",
        exact: false,
        Children: <Setting />
    },
    {
        path: "*",
        exact: false,
        Children: <Page404 />
    },
]