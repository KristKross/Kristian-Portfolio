import { useState } from "react";

interface LoginProps {
    onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (loading) return;

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        username: username.trim(),
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            onLogin();
        } catch (error) {
            console.error("Login error:", error);
            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#171E29] px-6 font-mono text-[#F5F7FA]">
            <div className="w-full max-w-md border border-[#3A4656] bg-[#202837] shadow-lg">
                <div className="border-b border-[#3A4656] bg-[#252E3C] px-5 py-3">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-[#5DADE2]">
                            portfolio-admin
                        </span>

                        <span className="text-[#8D99A8]">
                            auth
                        </span>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-8"
                >
                    <div>
                        <h1 className="text-xl font-semibold">
                            Administrator Login
                        </h1>

                        <p className="mt-2 text-xs text-[#8D99A8]">
                            Authenticate to access portfolio management.
                        </p>
                    </div>

                    {error && (
                        <div className="border border-red-400/30 bg-red-400/5 px-3 py-2 text-xs text-red-400">
                            [ ERROR ] {error}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-xs text-[#8D99A8]"
                        >
                            USERNAME
                        </label>

                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            autoComplete="username"
                            required
                            disabled={loading}
                            className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none focus:border-[#5DADE2] disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-xs text-[#8D99A8]"
                        >
                            PASSWORD
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                            required
                            disabled={loading}
                            className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none focus:border-[#5DADE2] disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full border border-[#5DADE2] bg-[#5DADE2]/10 px-4 py-2 text-sm text-[#5DADE2] transition hover:bg-[#5DADE2]/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "[ AUTHENTICATING... ]" : "[ LOGIN ]"}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Login