import { useEffect, useState } from "react";
import WindowControls from "../desktop/WindowControls";
import useDraggable from "../../hooks/useDraggable";

interface SystemMonitorProps {
    className?: string;
    y?: string;
    initialX?: number;
    initialY?: number;
    zIndex?: number;
    onFocus?: () => void;
}

interface Skill {
    _id: string;
    name: string;
    category: string;
    projects: number;
    activity: "Active" | "Learning" | "Familiar";
    order: number;
}

function SystemMonitor({
    className,
    initialX,
    initialY,
    zIndex,
    onFocus,
}: SystemMonitorProps) {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const {
        draggableRef,
        position,
        isDesktop,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    } = useDraggable<HTMLDivElement>(initialX, initialY);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:5000/api/skills"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch skills");
                }

                const data: Skill[] = await response.json();

                setSkills(data);
            } catch (error) {
                console.error(
                    "Failed to fetch skills:",
                    error
                );

                setError("Unable to load skills");
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const skillGroups = skills.reduce<
        Record<string, Skill[]>
    >((groups, skill) => {
        if (!groups[skill.category]) {
            groups[skill.category] = [];
        }

        groups[skill.category].push(skill);

        return groups;
    }, {});

    const totalSkills = skills.length;
    const totalCategories = Object.keys(skillGroups).length;

    const getActivityClass = (activity: Skill["activity"]) => {
        switch (activity) {
            case "Active":
                return "text-[#6F9D62]";

            case "Learning":
                return "text-[#D6B656]";

            case "Familiar":
                return "text-[#9A9A9A]";

            default:
                return "text-[#9A9A9A]";
        }
    };

    return (
        <div
            ref={draggableRef}
            onPointerDown={onFocus}
            className={`window-pop-in relative flex w-full max-w-[920px] flex-col px-6 pb-10 lg:absolute lg:m-4 ${className}`}
            style={{
                ...(isDesktop && {
                    left: position.x,
                    top: position.y,
                }),
                zIndex,
            }}
        >
            <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0f1115]/90">

                {/* Header */}
                <div className="border-b border-[#2a2a2a] bg-[#11151a] text-gray-300">

                    <div
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        className="relative flex cursor-default select-none justify-center px-4 py-2.5 lg:cursor-grab"
                    >
                        <span className="text-sm font-semibold text-[#e6e6e6]">
                            System Monitor
                        </span>

                        <div className="absolute right-4 flex items-center justify-center">
                            <WindowControls />
                        </div>
                    </div>

                    <div className="flex gap-2 border-t border-[#2a2a2a] bg-[#141b22] px-4 py-2">
                        {["File", "View", "Help"].map(
                            (item) => (
                                <button
                                    key={item}
                                    type="button"
                                    className="rounded px-2 py-1 text-sm hover:bg-gray-700"
                                >
                                    {item}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Content */}
                <main className="bg-[#0f1115] p-4 text-sm text-[#E6E6E6] sm:p-6">

                    {/* Column titles */}
                    <div className="grid grid-cols-4 gap-4 border-b border-[#2a2a2a] pb-3 font-semibold text-[#9A9A9A]">
                        <span>Skills</span>
                        <span>Category</span>
                        <span>Projects</span>
                        <span>Status</span>
                    </div>

                    <div className="min-h-[430px]">

                        {loading ? (
                            <div className="flex min-h-[430px] items-center justify-center text-xs text-[#9A9A9A]">
                                Loading skills...
                            </div>
                        ) : error ? (
                            <div className="flex min-h-[430px] items-center justify-center text-xs text-red-400">
                                [ ERROR ] {error}
                            </div>
                        ) : skills.length === 0 ? (
                            <div className="flex min-h-[430px] items-center justify-center text-xs text-[#9A9A9A]">
                                No skills found.
                            </div>
                        ) : (
                            Object.entries(skillGroups).map(
                                ([category, categorySkills]) => (
                                    <div
                                        key={category}
                                        className="mt-5"
                                    >
                                        <div className="mb-2 font-semibold text-[#4FC1E9]">
                                            {category.toUpperCase()}
                                        </div>

                                        {categorySkills
                                            .sort(
                                                (a, b) =>
                                                    a.order -
                                                    b.order
                                            )
                                            .map(
                                                (skill) => (
                                                    <div
                                                        key={
                                                            skill._id
                                                        }
                                                        className="grid grid-cols-4 gap-4 py-1.5"
                                                    >
                                                        <span>
                                                            {
                                                                skill.name
                                                            }
                                                        </span>

                                                        <span className="text-[#9A9A9A]">
                                                            {
                                                                skill.category
                                                            }
                                                        </span>

                                                        <span>
                                                            {String(
                                                                skill.projects
                                                            ).padStart(
                                                                2,
                                                                "0"
                                                            )}
                                                        </span>

                                                        <span
                                                            className={getActivityClass(
                                                                skill.activity
                                                            )}
                                                        >
                                                            {
                                                                skill.activity
                                                            }
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                )
                            )
                        )}

                    </div>

                    {/* Footer */}
                    <div className="mt-5 flex justify-between border-t border-[#2a2a2a] pt-3 text-[#9A9A9A]">
                        <div>
                            {totalSkills} skills loaded

                            <span className="mx-4">
                                {totalCategories} categories
                            </span>
                        </div>

                        <div className="text-[#6F9D62]">
                            ● Operational
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default SystemMonitor