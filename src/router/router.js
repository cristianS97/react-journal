// React router dom
import { createBrowserRouter } from "react-router-dom";
// Mis importaciones
import { Root } from "./Root";
import { JournalScreen } from "../components/journal/JournalScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h2>Ruta no encontrada</h2>,
        children: [
            {
                path: '',
                element: <JournalScreen />
            },
            {
                path: 'auth/',
                children: [
                    {
                        path: 'login',
                        element: <LoginScreen />
                    },
                    {
                        path: 'register',
                        element: <RegisterScreen />
                    }
                ]
            }
        ]
    }
]);