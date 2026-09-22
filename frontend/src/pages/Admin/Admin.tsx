import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./login";


function Admin() {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const controller = new AbortController();

            const timeout = setTimeout(() => {
                controller.abort();
            }, 5000);

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/auth/me`,
                    {
                        credentials: "include",
                        signal: controller.signal,
                    }
                );

                setAuthenticated(response.ok);
            } catch (error) {
                console.error("Authentication check failed:", error);
                setAuthenticated(false);
            } finally {
                clearTimeout(timeout);
            }
        };

        checkAuth();
    }, []);

    if (authenticated === null) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#171E29] font-mono text-[#8D99A8]">
                Checking authentication...
            </main>
        );
    }

    if (!authenticated) {
        return (
            <Login
                onLogin={() => setAuthenticated(true)}
            />
        );
    }

    return <Dashboard />;
}

export default Admin
