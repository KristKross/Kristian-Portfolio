import { useEffect, useState } from "react";
import SkillForm, { type Skill } from "./SkillsForm";

function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

    const fetchSkills = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/skills`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch skills");
            }

            const data = await response.json();

            setSkills(data);
        } catch (error) {
            console.error("Failed to fetch skills:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const deleteSkill = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/skills/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete skill");
            }

            await fetchSkills();
        } catch (error) {
            console.error("Failed to delete skill:", error);
        }
    };

    const handleNewSkill = () => {
        setEditingSkill(null);
        setShowForm(true);
    };

    const handleEditSkill = (skill: Skill) => {
        setEditingSkill(skill);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingSkill(null);
    };

    const handleSkillSaved = async () => {
        handleCloseForm();
        await fetchSkills();
    };

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
        <section>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">
                        Skills
                    </h1>

                    <p className="mt-1 text-xs text-[#8D99A8]">
                        Manage skills displayed in System Monitor.
                    </p>
                </div>

                <button
                    onClick={handleNewSkill}
                    className="border border-[#5DADE2] px-4 py-2 text-xs text-[#5DADE2] transition hover:bg-[#5DADE2]/10"
                >
                    + NEW SKILL
                </button>
            </div>

            {showForm && (
                <SkillForm
                    skill={editingSkill}
                    onClose={handleCloseForm}
                    onSaved={handleSkillSaved}
                />
            )}

            <div className="overflow-hidden border border-[#3A4656]">
                <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] border-b border-[#3A4656] bg-[#202837] px-4 py-3 text-xs text-[#8D99A8]">
                    <span>SKILL</span>
                    <span>CATEGORY</span>
                    <span>PROJECTS</span>
                    <span>ACTIVITY</span>
                    <span>ACTIONS</span>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-xs text-[#8D99A8]">
                        Loading skills...
                    </div>
                ) : skills.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#8D99A8]">
                        No skills found.
                    </div>
                ) : (
                    skills
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map((skill) => (
                            <div
                                key={skill._id}
                                className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] items-center border-b border-[#2A3442] px-4 py-4 text-xs last:border-b-0"
                            >
                                <span>{skill.name}</span>

                                <span className="text-[#8D99A8]">
                                    {skill.category}
                                </span>

                                <span>
                                    {String(skill.projects).padStart(2, "0")}
                                </span>

                                <span
                                    className={getActivityClass(
                                        skill.activity
                                    )}
                                >
                                    ● {skill.activity}
                                </span>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            handleEditSkill(skill)
                                        }
                                        className="text-[#5DADE2] hover:underline"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteSkill(skill._id)
                                        }
                                        className="text-red-400 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </section>
    );
}

export default Skills