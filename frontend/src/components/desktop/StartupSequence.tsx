import { useState } from "react";
import Typewriter from "../effects/Typewriter";
import desktopBackground from "../../assets/desktop-background.jpg";

interface StartupSequenceProps {
    onComplete: () => void;
}

type StartupStage = "boot" | "login";

const bootMessages = [
    "Loading portfolio kernel...",
    "Mounting /home/kristian...",
    "Loading projects and applications...",
    "Initialising development environment...",
    "Starting portfolio desktop...",
];

function BootScreen({ onComplete }: StartupSequenceProps) {
    const [currentMessage, setCurrentMessage] = useState(0);

    const handleComplete = () => {
        if (currentMessage === bootMessages.length - 1) {
            window.setTimeout(onComplete, 500);
            return;
        }

        setCurrentMessage((current) => current + 1);
    };

    return (
        <main className="min-h-screen bg-black px-6 py-6 font-mono text-sm text-white">
            <div className="space-y-1">
                {bootMessages.slice(0, currentMessage).map((message) => (
                    <div key={message}>{message}</div>
                ))}

                <Typewriter
                    key={currentMessage}
                    text={bootMessages[currentMessage]}
                    onComplete={handleComplete}
                />
            </div>
        </main>
    );
}

interface LoginScreenProps {
    onLogin: () => void;
}

function LoginScreen({ onLogin }: LoginScreenProps) {
    const handlePasswordComplete = () => {
        window.setTimeout(onLogin, 1200);
    };

    return (
        <main
            className="flex min-h-screen items-center justify-center bg-cover bg-center px-6 font-mono text-[#F5F7FA]"
            style={{
                backgroundImage: `url(${desktopBackground})`,
            }}
        >
            <div className="w-full max-w-md">
                {/* Login panel */}
                <div className="border border-[#3A4656] bg-[#202837] shadow-lg">
                    {/* Header */}
                    <div className="border-b border-[#3A4656] bg-[#252E3C] px-5 py-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-[#5DADE2]">
                                portfolio-login
                            </span>

                            <span className="text-[#8D99A8]">
                                tty1
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* User */}
                        <div className="mb-6 flex items-center border border-[#3A4656] bg-[#171E29] px-4 py-3 text-sm">
                            <span className="mr-3 text-[#5DADE2]">
                                user:
                            </span>

                            <span className="text-[#F5F7FA]">
                                kristian
                            </span>
                        </div>

                        {/* Password */}
                        <div className="mb-6 flex items-center border border-[#3A4656] bg-[#171E29] px-4 py-3 text-sm">
                            <span className="mr-3 text-[#5DADE2]">
                                password:
                            </span>

                            <span className="text-[#F5F7FA]">
                                <Typewriter
                                    text="••••••••"
                                    speed={180}
                                    onComplete={handlePasswordComplete}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="px-5 py-3">
                        <div className="flex items-center justify-between px-1 text-[10px] text-[#8D99A8]">
                            <span>PORTFOLIO OS</span>
                            <span>SESSION: 01</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function StartupSequence({ onComplete }: StartupSequenceProps) {
    const [stage, setStage] = useState<StartupStage>("boot");

    if (stage === "boot") {
        return (
            <BootScreen
                onComplete={() => setStage("login")}
            />
        );
    }

    return (
        <LoginScreen
            onLogin={onComplete}
        />
    );
}

export default StartupSequence;