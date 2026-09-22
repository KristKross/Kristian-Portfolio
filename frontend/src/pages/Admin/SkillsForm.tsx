import { useEffect, useState } from "react";

export interface Skill {
    _id: string;
    name: string;
    category: string;
    projects: number;
    activity: "Active" | "Learning" | "Familiar";
    order: number;
}

interface SkillFormProps {
    skill: Skill | null;
    onClose: () => void;
    onSaved: () => void;
}

function SkillsForm({
    skill,
    onClose,
    onSaved,
}: SkillFormProps) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [projects, setProjects] = useState("0");
    const [activity, setActivity] = useState<
        "Active" | "Learning" | "Familiar"
    >("Active");
    const [order, setOrder] = useState("0");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const editing = skill !== null;

    useEffect(() => {
        if (skill) {
            setName(skill.name);
            setCategory(skill.category);
            setProjects(String(skill.projects));
            setActivity(skill.activity);
            setOrder(String(skill.order));
        } else {
            setName("");
            setCategory("");
            setProjects("0");
            setActivity("Active");
            setOrder("0");
        }

        setError("");
    }, [skill]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (loading) return;

        setError("");
        setLoading(true);

        const skillData = {
            name: name.trim(),
            category: category.trim(),
            projects: Number(projects),
            activity,
            order: Number(order),
        };

        try {
            const url = editing
                ? `${import.meta.env.VITE_API_URL}/api/skills/${skill._id}`
                : `${import.meta.env.VITE_API_URL}/api/skills`;

            const response = await fetch(url, {
                method: editing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(skillData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                        `Failed to ${
                            editing ? "update" : "create"
                        } skill`
                );
                return;
            }

            onSaved();
        } catch (error) {
            console.error("Skill save error:", error);

            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-6 border border-[#3A4656] bg-[#202837]">
            <div className="flex items-center justify-between border-b border-[#3A4656] bg-[#252E3C] px-5 py-3">
                <span className="text-sm text-[#5DADE2]">
                    {editing ? "edit-skill" : "new-skill"}
                </span>

                <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="text-xs text-[#8D99A8] hover:text-[#F5F7FA]"
                >
                    [ CLOSE ]
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6"
            >
                {error && (
                    <div className="border border-red-400/30 bg-red-400/5 px-3 py-2 text-xs text-red-400">
                        [ ERROR ] {error}
                    </div>
                )}

                {/* Name */}
                <div>
                    <label
                        htmlFor="skill-name"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        SKILL
                    </label>

                    <input
                        id="skill-name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="React"
                        required
                        disabled={loading}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />
                </div>

                {/* Category */}
                <div>
                    <label
                        htmlFor="skill-category"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        CATEGORY
                    </label>

                    <input
                        id="skill-category"
                        type="text"
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                        placeholder="Frontend"
                        required
                        disabled={loading}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />
                </div>

                {/* Projects / Activity */}
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="skill-projects"
                            className="mb-2 block text-xs text-[#8D99A8]"
                        >
                            PROJECTS
                        </label>

                        <input
                            id="skill-projects"
                            type="number"
                            min="0"
                            value={projects}
                            onChange={(event) =>
                                setProjects(event.target.value)
                            }
                            required
                            disabled={loading}
                            className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                        />

                        <p className="mt-1 text-[10px] text-[#536071]">
                            Number of projects using this skill.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="skill-activity"
                            className="mb-2 block text-xs text-[#8D99A8]"
                        >
                            ACTIVITY
                        </label>

                        <select
                            id="skill-activity"
                            value={activity}
                            onChange={(event) =>
                                setActivity(
                                    event.target.value as
                                        | "Active"
                                        | "Learning"
                                        | "Familiar"
                                )
                            }
                            disabled={loading}
                            className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none focus:border-[#5DADE2] disabled:opacity-50"
                        >
                            <option value="Active">
                                Active
                            </option>

                            <option value="Learning">
                                Learning
                            </option>

                            <option value="Familiar">
                                Familiar
                            </option>
                        </select>

                        <p className="mt-1 text-[10px] text-[#536071]">
                            Current level of activity with this skill.
                        </p>
                    </div>
                </div>

                {/* Display Order */}
                <div>
                    <label
                        htmlFor="skill-order"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        DISPLAY ORDER
                    </label>

                    <input
                        id="skill-order"
                        type="number"
                        min="0"
                        value={order}
                        onChange={(event) =>
                            setOrder(event.target.value)
                        }
                        disabled={loading}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none focus:border-[#5DADE2] disabled:opacity-50"
                    />

                    <p className="mt-1 text-[10px] text-[#536071]">
                        Lower numbers appear first.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-[#3A4656] pt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="border border-[#3A4656] px-4 py-2 text-xs text-[#8D99A8] hover:border-[#5DADE2] hover:text-[#5DADE2] disabled:opacity-50"
                    >
                        [ CANCEL ]
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="border border-[#5DADE2] bg-[#5DADE2]/10 px-4 py-2 text-xs text-[#5DADE2] hover:bg-[#5DADE2]/20 disabled:opacity-50"
                    >
                        {loading
                            ? "[ SAVING... ]"
                            : editing
                              ? "[ UPDATE SKILL ]"
                              : "[ CREATE SKILL ]"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SkillsForm