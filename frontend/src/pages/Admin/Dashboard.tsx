import { useState } from "react";
import Projects from "./Projects";
import Skills from "./Skills";

function Dashboard() {
    const [activeTab, setActiveTab] = useState<"projects" | "skills">(
        "projects"
    );

    return (
        <main className="min-h-screen bg-[#171E29] font-mono text-[#F5F7FA]">
            {/* Header */}
            <header className="border-b border-[#3A4656] bg-[#202837]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div>
                        <div className="text-sm text-[#5DADE2]">
                            portfolio-admin
                        </div>

                        <div className="text-xs text-[#8D99A8]">
                            Management Dashboard
                        </div>
                    </div>

                    <button
                        className="border border-[#3A4656] px-3 py-1.5 text-xs text-[#8D99A8] transition hover:border-[#5DADE2] hover:text-[#5DADE2]"
                    >
                        [ LOGOUT ]
                    </button>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Navigation */}
                <div className="mb-8 flex gap-2 border-b border-[#3A4656]">
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`px-4 py-3 text-sm ${
                            activeTab === "projects"
                                ? "border-b-2 border-[#5DADE2] text-[#5DADE2]"
                                : "text-[#8D99A8] hover:text-[#F5F7FA]"
                        }`}
                    >
                        Projects
                    </button>

                    <button
                        onClick={() => setActiveTab("skills")}
                        className={`px-4 py-3 text-sm ${
                            activeTab === "skills"
                                ? "border-b-2 border-[#5DADE2] text-[#5DADE2]"
                                : "text-[#8D99A8] hover:text-[#F5F7FA]"
                        }`}
                    >
                        Skills
                    </button>
                </div>

                {/* Content */}
                {activeTab === "projects" && <Projects />}

                {activeTab === "skills" && <Skills />}
            </div>
        </main>
    );
}

export default Dashboard